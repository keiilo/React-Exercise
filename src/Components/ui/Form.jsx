import { useState } from 'react';

export default function Form() 

{
    //useState hook to manage the state of the input field
    const [name, setName] = useState('');

    
    
    //event handler for form submission
    function handleSubmit(e) {
        e.preventDefault();
        console.log(name);
    }

    return (
        <form menthod="POST" onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
           
            <button type="submit">Submit</button>
        </form>
    );
}

