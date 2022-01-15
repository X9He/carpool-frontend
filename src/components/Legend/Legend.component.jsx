import React from 'react';

import './Legend.styles.scss'

const Legend = ({legendTitle, legendItem}) => (
    <div className='Legend'>
        <b>{legendTitle}</b>

        {legendItem.map(item => (
            <div className='legendItem'>
                <div className='legendBox' style={{backgroundColor: item.color}}></div>
                <span>{item.name}</span>

            </div>))}

    </div>
)

export default Legend;

