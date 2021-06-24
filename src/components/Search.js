import React from 'react';
import { connect } from 'react-redux';
import { search } from './../actions/classActions';

const Search = (props) => {
    const { classList } = props;
    console.log(classList)
    
    return(
        <div>
            <h3>Filter Classes</h3>
            <form action='/' method='get'>
            <label htmlFor="header-search">Time:&nbsp;</label>
                <input 
                    type="text"
                    onInput={(e) => {
                        const filteredClasses = classList.filter(item => item.time.includes(e.target.value))
                        console.log(filteredClasses)
                        props.search(filteredClasses)
                    }}
                />
                <label htmlFor="header-search">Duration:&nbsp;</label>
                <input 
                    type="text"
                    onInput={(e) => {
                        const filteredClasses = classList.filter(item => item.duration.includes(e.target.value))
                        console.log(filteredClasses)
                        props.search(filteredClasses)
                    }}
                />
                <label htmlFor="header-search">Type:&nbsp;</label>
                <input 
                    type="text"
                    onInput={(e) => {
                        const filteredClasses = classList.filter(item => item.type.includes(e.target.value))
                        console.log(filteredClasses)
                        props.search(filteredClasses)
                    }}
                />
                <label htmlFor="header-search">Intensity Level:&nbsp;</label>
                <input 
                    type="text"
                    onInput={(e) => {
                        const filteredClasses = classList.filter(item => item.intensityLvl.includes(e.target.value))
                        console.log(filteredClasses)
                        props.search(filteredClasses)
                    }}
                />
                <label htmlFor="header-search">Location:&nbsp;</label>
                <input 
                    type="text"
                    onInput={(e) => {
                        const filteredClasses = classList.filter(item => item.location.includes(e.target.value))
                        console.log(filteredClasses)
                        props.search(filteredClasses)
                    }}
                />
                
                {/* <button type="submit">Search</button> */}
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return({
        classList: state.classes.classList
    })
}

export default connect(mapStateToProps, { search })(Search);