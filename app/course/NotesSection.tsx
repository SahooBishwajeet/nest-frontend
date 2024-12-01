"use client"

import { useState } from 'react';

const NotesSection = () => {
    const [notes, setNotes] = useState<string[]>([]);
    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, newNote]);
            setNewNote('');
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Take Notes</h3>
            <div className="grid gap-2 mt-2">
                {notes.map((note, index) => (
                    <div key={index} className="p-2 bg-gray-200 rounded">
                        {note}
                    </div>
                ))}
                <div className="flex items-center">
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Type here"
                        className="border p-2 flex-grow rounded"
                    />
                    <button onClick={addNote} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotesSection;
