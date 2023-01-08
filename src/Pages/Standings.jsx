import React, { useEffect } from 'react';
import axios from "axios"
import './../App.css'

function Standings({ tableData, setTableData }) {

    const STANDINGS_URL = process.env.REACT_APP_PROD_STANDINGS_URL;

    const requestStandings = async() => {
        try {
            const res = await axios.post(STANDINGS_URL, {})
            setTableData(res.data.tableData)
            console.log(res.data.tableData)
        } catch(error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }  
        }
    }

    useEffect(() => {
        requestStandings();
    });

    const getScore = (item) => {
        const ans = "+";
        const p = item;
        if (p === 0)
            return ans;
        else 
            return ans + String(p);
    }

    const getProfileLink = (handle) => {
        const p1 = 'https://codeforces.com/profile/'
        const p2 = handle 
        return p1.concat(p2)
    }

    const getHandleItem = (handle, rank) => {
        const rank_to_style = {
            'unrated': 'handle-unrated',
            'headquarters': 'handle-black',
            'newbie': 'handle-grey',
            'pupil': 'handle-green',
            'specialist': 'handle-cyan',
            'expert': 'handle-blue',
            'candidate master': 'handle-purple',
            'master': 'handle-orange',
            'international master': 'handle-orange',
            'grandmaster': 'handle-red',
            'international grandmaster': 'handle-red',
            'legendary grandmaster': 'handle-nutella'
        }
        return <td><a href={getProfileLink(handle)} className={rank_to_style[rank]}>{handle}</a></td>
    }
    
    const getTableItem = (item, flag=true) => {
        if (!flag)
            return <td>{item}</td>
        if (item === '')
            return <td></td>
        if (item < 0)
            return <td className='wa-submission'>{item}</td>
        return <td className='ac-submission'>{getScore(item)}</td>
    }
    
    const getRow = (row) => {

        const results = row['results'] 
        console.log(results)
        return (
        <tr>
            {getTableItem(row['position'], false)}
            {getHandleItem(row['handle'], row['rank'])}
            {getTableItem(row['score'], false)}
            {results.map((item) => 
                getTableItem(item)
            )}   
        </tr>
        )
    }
    
    return (
    <table>
        <caption>Standings</caption>
        <thead>
          <tr>
            <th>№</th>
            <th className='user-block'>User</th>
            <th className='ac-block'>Total AC</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th>G</th>
            {/* <th>H</th>
            <th>I</th>
            <th>J</th>
            <th>K</th>
            <th>L</th>
            <th>M</th>
            <th>M</th>
            <th>O</th>
            <th>P</th>
            <th>Q</th>
            <th>R</th>
            <th>S</th>
            <th>T</th> */}
          </tr>
        </thead>
        <tbody>
            {tableData.map((row) => getRow(row))}
        </tbody>
      </table>
    )
}

export default Standings;