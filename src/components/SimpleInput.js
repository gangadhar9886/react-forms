import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        hasError: nameInputHasError,
        valueIsValid: isEnteredNameValid,
        inputBlurHandler: nameInputBlurHandler,
        valueChangeHandler: nameInputChangeHandler, reset: nameReset
    } = useInput(value => value.trim() !== "");

    const validateEmail = email => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
            return true;
        }
        return false;
    }

    const {
        value: enteredEmail,
        hasError: isEnteredEmailInValid,
        valueIsValid: isEnteredEmailValid,
        inputBlurHandler: emailInputBlurHandler, valueChangeHandler: emailInputChangeHandler, reset: emailReset
    } = useInput(value => validateEmail(value));

    let isFormValid = false;

    if (isEnteredNameValid && isEnteredEmailValid) {
        isFormValid = true;
    }
    console.log('isFormValid', isFormValid);
    const formHandler = event => {
        event.preventDefault();
        nameInputBlurHandler();
        emailInputBlurHandler();

        console.log("Name", enteredName);
        console.log("Email", enteredEmail);

        nameReset();
        emailReset()
    }
    const nameFormClass = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailFormClass = isEnteredEmailInValid ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formHandler}>
            <div className={nameFormClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler}
                       value={enteredName}/>
                {nameInputHasError && <p className="error-text">Name is Mandatory</p>}
            </div>
            <div className={emailFormClass}>
                <label htmlFor="email">Your Email</label>
                <input type='email' id='email' onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler}
                       value={enteredEmail}/>
                {isEnteredEmailInValid && <p className="error-text">Email is Mandatory</p>}
            </div>
            <div className="form-actions">
                <button disabled={!isFormValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
