import React from 'react';
import styles from './onOffIndicator.module.css'

type IndicatorProps = {
    onIsClick: boolean
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const OnOffIndicator = ({onIsClick, handleClick}: IndicatorProps) => {
    return (
        <div className={styles.indicatorWrapper}>
            <button className={styles.button} style={{backgroundColor : onIsClick ? 'green' : 'grey'}} name={'on'} onClick={handleClick}>on</button>
            <button className={styles.button} style={{backgroundColor : !onIsClick ? 'red' : 'grey'}} name={'off'} onClick={handleClick}>off</button>
            <div className={styles.indicator} style={{backgroundColor : onIsClick ? 'green' : 'red'}}></div>

        </div>
    );
};

