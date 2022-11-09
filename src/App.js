import { useState } from 'react';
import history from './json/listen_history.json'

const currentYear = 2022;


function App() {

  const [topPlayed, setTopPlayed] = useState([]);
  const [monthPlayed, setMonthPlayed] = useState([]);

  const analyze = e => {

    let playedMap = new Map(); //for 10 top most played songs
    let playedMonth = new Array(12);  //for most played songs by month each year
    playedMonth.fill(false);

    for (let song of history){
      let title = song.title.replace(/^Watched /g, "");
      playedMap.set(title, (playedMap.get(title) || 0) + 1);


      // Find if used music service monthly throughout the year
      let date = new Date(song.time);
      let year = date.getFullYear();
      let month = date.getMonth();
      if (year === currentYear){
        playedMonth[month] = true;
      }
      
    }
    setMonthPlayed(playedMonth);
    
    // place title & times played to array for easy sorting
    let arr = [];
    for (let [title, played] of playedMap){
      arr.push([title, played]);
    }

    //sort songs according to times played in descending order
    arr.sort((a, b) => b[1] - a[1]);

    //return top 10 result
    setTopPlayed(arr.slice(0, 10));

  }



  return (
    <div className='m-5'>
      <button onClick={analyze}>See Result</button>
      { topPlayed.length > 0 &&
        <div>
            <div className='my-5'>
              <h2>Top 10 Songs Played</h2>
              <div>
                {
                  topPlayed.map((song, index) =>
                    <p key={index}>{song[0]} (played {song[1]} times)</p>
                  )
                }
              </div>
            </div>
            <div>
              <h2>Months Service Is Being Used This Year</h2>
              <table>
                <thead>
                  <th>Month</th>
                  <th>Used?</th>
                </thead>
                <tbody>
                  {
                    monthPlayed.map((played, month) =>
                      <tr key={month}>
                        <td>{month + 1}</td>
                        <td>{played? "Yes" : "No"}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
        </div>
      }
    </div>
  );
}

export default App;
