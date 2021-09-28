import React from 'react';
import CourseList from './components/CourseList';
import './App.css';
import { addScheduleTimes } from './utilities/times.js';
import { useData} from './utilities/firebase.js';

const App = () => {
  const [schedule, loading, error] = useData('/schedule', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

export default App;