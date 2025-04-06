import { Request, Response } from 'express';
import pool from '../database/database';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const {
    eventName,
    description,
    imageUrl,
    isChecked,
    date,
    price,
    location,
    organizerName,
    categoryId,
  } = req.body;

  try {
    // Check if the category_id exists in the category table
    const [categoryRows] = await pool.execute(
      `SELECT id FROM category WHERE id = ?`,
      [categoryId]
    );

    if ((categoryRows as any[]).length === 0) {
      res.status(400).json({
        success: false,
        message: `Category with ID ${categoryId} does not exist.`,
      });
      return;
    }

    // Insert the event into the events table
    const [result] = await pool.execute(
      `INSERT INTO events (name, description, image, promoted, date, price, location, organizer, category_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [eventName, description, imageUrl, isChecked, date, price, location, organizerName, categoryId]
    );

    res.status(201).json({
      success: true,
      message: 'Event created successfully!',
      data: { id: (result as any).insertId, ...req.body },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: (error instanceof Error) ? error.message : 'Unknown error',
    });
  }
};