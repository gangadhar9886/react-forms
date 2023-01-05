import {useState} from "react";

const SimpleInput = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');

    const [isNameInputTouched, setIsNameInputTouched] = useState(false);
    const isEnteredNameValid = enteredName.trim() !== '';
    const isEnteredNameInValid = !isEnteredNameValid && isNameInputTouched;

    const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

    const validateEmail = email => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
            return true;
        }
        return false;
    }
    const isEnteredEmailValid = validateEmail(enteredEmail);
    const isEnteredEmailInvalid = !isEnteredEmailValid && isEmailInputTouched;

    let isFormValid = false;

    if (isEnteredNameValid && isEnteredEmailValid) {
        isFormValid = true;
    }
    console.log('isFormValid', isFormValid);
    const nameInputChangeHandler = event => {
        console.log("Input Change Handler", event.target.value);
        setEnteredName(event.target.value);
    }

    const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value);
    }
    const formHandler = event => {
        event.preventDefault();
        setIsNameInputTouched(true);
        setIsEmailInputTouched(true);

        console.log("Name", enteredName);
        console.log("Email", enteredEmail);

        setEnteredName('');
        setIsNameInputTouched(false);

        setEnteredEmail('');
        setIsEmailInputTouched(false);
    }
    const nameFormClass = isEnteredNameInValid ? 'form-control invalid' : 'form-control';
    const emailFormClass = isEnteredEmailInvalid ? 'form-control invalid' : 'form-control';
    const nameInputBlurHandler = event => {
        setIsNameInputTouched(true);
    }

    const emailInputBlurHandler = event => {
        setIsEmailInputTouched(true);
    }
    return (
        <form onSubmit={formHandler}>
            <div className={nameFormClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler}
                       value={enteredName}/>
                {isEnteredNameInValid && <p className="error-text">Name is Mandatory</p>}
            </div>
            <div className={emailFormClass}>
                <label htmlFor="email">Your Email</label>
                <input type='email' id='email' onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler}
                       value={enteredEmail}/>
                {isEnteredEmailInvalid && <p className="error-text">Email is Mandatory</p>}
            </div>
            <div className="form-actions">
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
