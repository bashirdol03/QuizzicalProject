import React from 'react'


function TriviaSection(props) {

   const formData = props.formData

   const question = props.question

   const usersAnswer = formData[question]

   const theCorrectAnswer = props.theCorrectAnswer

   const showAnswer = props.showCorrectAnswer

   const showScore = props.showScore

   
   
   let colorOfText
   function setColorOfText(ans){

      if(ans === theCorrectAnswer && ans === usersAnswer){
         colorOfText = '#94D7A2'
         return colorOfText
      }else if(ans === theCorrectAnswer && ans !== usersAnswer){
         colorOfText = '#94D7A2'
         return colorOfText
      }else if(ans === usersAnswer && ans !== theCorrectAnswer){
         colorOfText = '#F8BCBC'
         return colorOfText
      }
}
        

   const answersData = props.answersData.map(answer => {
      return answer
   })

   
       
   const answersHtml = answersData.map(answer => {
      return  <>
      
      
    <div className="trivia-answer">
      <input  {...(showScore && { disabled: true })}
                    type="radio"
                    id={answer.ansId}
                    name={question}
                    value={answer.ans}
                    /*checked={formData.question === answer.ans} commenting this out allows me to see what i click on , not sure why*/
                    onChange={() => {
                     props.handleChange(event)
                    }}
                    {...(!showScore && { className : "check-with-label" })} /* using this is the only way I can currently visually change the labels style based on whic radio button I click on*/
                    /* hides the users input in the final page*/
                    
                /> 
                <label {...(!showScore && { className : "label-for-check" })} htmlFor={answer.ansId} style={{backgroundColor: ( (answer.ans === usersAnswer || answer.ans === theCorrectAnswer) && showAnswer)  ? setColorOfText(answer.ans) : "", opacity : ((answer.ans === theCorrectAnswer) && showAnswer) && "1" }}>{answer.ans}</label>
      </div>
       </>
   })

   
   
   


  
    return (
       <div className='trivia-section'>
         
          <h3>{question}</h3>

          <div className='answers-section'>
            {answersHtml}
          </div>

       </div>   
       
          

       
    )
  }

  
  
  export default TriviaSection



   /*  <h3 onClick={() => props.changeColor(props.answersArray[0].ansId)}>{props.question}</h3>

          <div>
          <p onClick={() => props.changeAnswer(props.id, props.answersArray[0].ansId)} style={{color: props.answersArray[0].isChosen ? "blue" : "white"}}>{props.answersArray[0].ans}</p>
          <p onClick={() => props.changeAnswer(props.id, props.answersArray[1].ansId)} style={{color: props.answersArray[1].isChosen ? "blue" : "white"}}>{props.answersArray[1].ans}</p>
          <p onClick={() => props.changeAnswer(props.id, props.answersArray[2].ansId)} style={{color: props.answersArray[2].isChosen ? "blue" : "white"}}>{props.answersArray[2].ans}</p>
          <p onClick={() => props.changeAnswer(props.id, props.answersArray[3].ansId)} style={{color: props.answersArray[3].isChosen ? "blue" : "white"}}>{props.answersArray[3].ans}</p>
          </div> 
          
          */



           /*<input 
                    type="radio"
                    id={answer.ansId}
                    name={questionId}
                    value={answer.ans}
                    checked={formData.questionId === answer.ans}
                    onChange={() => {
                     props.handleChange(event)
                    }}
                    
                />
                <label htmlFor={answer.ansId}>{answer.ans}</label> */

                /*const incorrectAnswerColor = showUsersAnswer ? 'red' : 'white'*/

   /*const colorOfText = usersAnswer === theCorrectAnswer ? 'green' : 'red' *//* only if the user clicks the correct answer will that answer be green */
    /* what if the answer is correct but the user did not click it, it should still be green , figured it all out with a function */

   /*const correctAnswerColor = showAnswer ? colorOfText : 'white' */
