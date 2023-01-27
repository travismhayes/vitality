import React, { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import moment from 'moment/moment';
import 'react-tooltip/dist/react-tooltip.css';

export default function HeatMap() {
  const [contributions, setContributions] = useState([]);

  const HeatMapData = (responseData) => {
    let contributions = [];
    let week = [];
    let date = moment();

    // Convert the API data into an object where the keys are the dates
    // and the values are the contributions
    const apiData = Object.entries(responseData).reduce((obj, [date, contributions]) => {
      obj[date] = contributions;
      return obj;
    }, {});

    Array.from({ length: 366 }, (_, i) => {
      date.subtract(1, 'days');
      const day = {
        date: date.format('YYYY-MM-DD'),
        contributions: apiData[date.format('YYYY-MM-DD')] || 0,
      };
      week.push(day);
      if (date.day() === 6) {
        contributions.push(week.reverse());
        week = [];
      }
    });
    return contributions;
  }

  const getLevelAttribute = (contributions) => {
    if (contributions >= 400) {
      return 'bg-slate-600';
    } else if (contributions >= 300) {
      return 'bg-slate-500';
    } else if (contributions >= 200) {
      return 'bg-slate-400';
    } else if (contributions >= 1) {
      return 'bg-slate-300';
    } else {
      return 'bg-slate-100';
    }
  }

  useEffect(() => {
    fetch('/api/streak')
      .then(response => response.json())
      .then(data => {
        setContributions(HeatMapData(data));
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="flex-col">
        <div className="text-sm uppercase text-right my-0.5 mr-2">Sun</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Mon</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Tue</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Wed</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Thu</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Fri</div>
        <div className="text-sm uppercase text-right my-0.5 mr-2">Sat</div>
      </div>
        <div className="flex flex-row-reverse overflow-x-scroll scrollbar-hide">
          {contributions.map((week, index) => (
            <div className="flex flex-col" key={index}>
              {week.map((day, index) => (
                <div className="block" key={index}>
                    <div
                      id={`tooltip-${day.date}`}
                      className={`w-5 h-5 m-px rounded-sm edit-count hover:border-2 border-indigo-500 ${getLevelAttribute(day.contributions)}`}
                      data-day={`${day.date}`}
                    />
                    <ReactTooltip
                      anchorId={`tooltip-${day.date}`}
                      place="bottom"
                      content={`Date: ${day.date} Count: ${day.contributions}`}
                    />
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  );
}