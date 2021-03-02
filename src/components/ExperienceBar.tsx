import React from 'react'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = () => {
    return (
        <div className={styles.experienceBar}>
            <span>0 px</span>
            <div>
                <div style={{width: '50%'}} />
                <span className={styles.currentExperience} style={{left: '50%'}}>300 px</span>
            </div>
            <span>600 px</span>
        </div>
    )
}

export default ExperienceBar
