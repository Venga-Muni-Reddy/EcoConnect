import React, { useState } from 'react';

const GreenGoalsDashboard = () => {
    const [goals, setGoals] = useState([
        { id: 1, text: 'Reduce plastic use by 50%', completed: false, progress: 30 },
        { id: 2, text: 'Bike to work twice a week', completed: true, progress: 100 },
        { id: 3, text: 'Compost kitchen waste', completed: false, progress: 75 },
    ]);
    const [newGoalText, setNewGoalText] = useState('');

    const handleAddGoal = (e) => {
        e.preventDefault();
        if (newGoalText.trim()) {
            setGoals([...goals, { id: Date.now(), text: newGoalText, completed: false, progress: 0 }]);
            setNewGoalText('');
        }
    };

    const toggleGoalCompletion = (id) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 } : goal
        ));
    };

    const updateGoalProgress = (id, newProgress) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, progress: Math.min(100, Math.max(0, newProgress)), completed: newProgress === 100 } : goal
        ));
    };

    return (
        <div style={{ marginBottom: '30px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#2C3E50', marginBottom: '20px' }}>Your Green Goals</h3>

            <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new green goal..."
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                    style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn btn-success">Add Goal</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {goals.length === 0 && <p style={{ color: '#666' }}>No goals set yet. Start adding some!</p>}
                {goals.map(goal => (
                    <div key={goal.id} style={{
                        border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px',
                        backgroundColor: goal.completed ? '#e6ffe6' : '#fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{
                                fontWeight: 'bold',
                                color: goal.completed ? '#28a745' : '#34495e',
                                textDecoration: goal.completed ? 'line-through' : 'none'
                            }}>
                                {goal.text}
                            </span>
                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => toggleGoalCompletion(goal.id)}
                                style={{ transform: 'scale(1.2)' }}
                            />
                        </div>
                        {!goal.completed && (
                            <div style={{ marginTop: '10px' }}>
                                <label style={{ display: 'block', fontSize: '0.9em', color: '#666' }}>Progress: {goal.progress}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={goal.progress}
                                    onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: '#4CAF50' }}
                                />
                                {goal.progress === 100 && (
                                    <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '5px' }}>Goal Achieved! 🎉</p>
                                )}
                            </div>
                        )}
                        {goal.completed && (
                             <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '5px' }}>Completed! 🎉</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GreenGoalsDashboard;