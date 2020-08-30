import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({title, cases, total, active, isRed, ...props}) {
    return (
            <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
                <CardContent>
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>

                    <h3 className={`infoBox_cases ${!isRed && 'infoBox_cases--green'}`}>
                     {cases} </h3>

                    <Typography className="infoBox_total" color="textSecondary">
                        {total} total
                    </Typography>
                </CardContent>

            </Card>
            
    )
}

export default InfoBox
