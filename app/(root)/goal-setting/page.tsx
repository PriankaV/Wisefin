"use client";

import React, { useState, useEffect } from 'react';
import HeaderBox from '@/components/HeaderBox';

const GoalSettingPage = () => {
  const [goals, setGoals] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0); // Placeholder for Plaid data

  const categories = ['Saving', 'Expenses'];

  const toggleCategory = () => setCategoryOpen(!categoryOpen);
  const selectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCategoryOpen(false);
  };

  const calculateProgress = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    const totalDuration = end.getTime() - start.getTime();
    const timeSpent = now.getTime() - start.getTime();
    const progress = Math.min((timeSpent / totalDuration) * 100, 100); // Ensure it's between 0 and 100
    return progress;
  };

  const handleSubmitGoal = () => {
    if (selectedCategory && goalName && budget && startDate && endDate) {
      const newGoal = {
        category: selectedCategory,
        name: goalName,
        startDate,
        endDate,
        budget,
        notes,
        progress: calculateProgress()
      };
      setGoals([...goals, newGoal]);
      setSelectedCategory('');
      setGoalName('');
      setStartDate('');
      setEndDate('');
      setBudget('');
      setNotes('');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  // Dummy data for Plaid integration later
  useEffect(() => {
    // Plaid API call here to set currentBalance based on accounts
    setCurrentBalance(500); // Example value
  }, []);

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
                    onClick={() => selectCategory(cat)}>{cat}
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
            placeholder='Enter goal name' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Start Date:</label>
          <input 
            type='date' 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>End Date:</label>
          <input 
            type='date' 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Budget amount:</label>
          <input 
            type='number' 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder='Enter budget' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <div>
          <label className='block font-bold mb-2'>Additional notes:</label>
          <input 
            type='text' 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Enter notes' 
            className='w-full border-b-2 p-3 focus:outline-none focus:border-teal-300'
          />
        </div>

        <button 
          onClick={handleSubmitGoal} 
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
              <p>Timeline: {goal.startDate} - {goal.endDate}</p>
              <p>Budget: ${goal.budget}</p>
              <p>Progress: {goal.progress}%</p>
              <div className='w-full bg-gray-200 h-2 rounded'>
                <div 
                  className='bg-teal-500 h-2 rounded'
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p>Notes: {goal.notes}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Current Balance: ${currentBalance}</h2>
        <p>{currentBalance >= 0 ? 'You are on track!' : 'You need to save more.'}</p>
      </div>
    </section>
  );
};

export default GoalSettingPage;
