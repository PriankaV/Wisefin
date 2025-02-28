"use client";

import React, { useState } from 'react';
import HeaderBox from '@/components/HeaderBox';

const GoalSettingPage = () => {
  const [goals, setGoals] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [goalName, setGoalName] = useState('');
  const [timeline, setTimeline] = useState(4);
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const categories = ['Saving', 'Expenses'];

  const toggleCategory = () => setCategoryOpen(!categoryOpen);
  const selectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
  };

  return (
    <section className='p-8 space-y-6'>
      <HeaderBox 
        title='Add a goal' 
        subtext='Plan your financial goals with ease.'
      />

      <div className='border-2 border-blue-200 rounded-2xl p-6 space-y-6 shadow-lg'>
        <div>
          <label className='block font-bold mb-2'>Category:</label>
          <div className='relative'>
            <button onClick={toggleCategory} className='w-full border rounded-lg p-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-300'>
              {selectedCategory || 'Select Category'}
            </button>
            {categoryOpen && (
              <div className='absolute w-full bg-gray-100 border rounded-md mt-1 z-10'>
                {categories.map((cat) => (
                  <div 
                    key={cat} 
                    className='p-2 hover:bg-teal-300 cursor-pointer'
                    onClick={() => selectCategory(cat)}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className='block font-bold mb-2'>Goal name:</label>
          <input 
            type='text' 
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder='Enter Here' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Timeline:</label>
          <input 
            type='range' 
            min='1' max='12' 
            value={timeline}
            onChange={(e) => setTimeline(Number(e.target.value))}
            className='w-full'
          />
          <p>{timeline} Months</p>
        </div>

        <div>
          <label className='block font-bold mb-2'>Budget amount:</label>
          <input 
            type='text' 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder='Enter Here' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Additional notes:</label>
          <input 
            type='text' 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Enter Here' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <button 
          onClick={() => {
            if (selectedCategory && goalName && budget) {
              const newGoal = {
                category: selectedCategory,
                name: goalName,
                timeline: timeline,
                budget: budget,
                notes: notes
              };
              setGoals([...goals, newGoal]);
              setSelectedCategory('');
              setGoalName('');
              setTimeline(4);
              setBudget('');
              setNotes('');
            } else {
              alert('Please fill out all required fields.');
            }
          }} 
          className='w-full bg-teal-500 text-white font-bold py-2 rounded-lg hover:bg-teal-600'>
          Add Goal
        </button>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Your Goals:</h2>
        <ul className='space-y-4'>
          {goals.map((goal, index) => (
            <li key={index} className='border rounded-lg p-4 shadow-md'>
              <h3 className='font-bold'>{goal.name}</h3>
              <p>Category: {goal.category}</p>
              <p>Timeline: {goal.timeline} Months</p>
              <p>Budget: ${goal.budget}</p>
              <p>Notes: {goal.notes}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GoalSettingPage;
