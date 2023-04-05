import { useState } from 'react'
import TriviaSection from './Components/TriviaSection'
import React from 'react'
import { v4 as uuid } from 'uuid';
import he from 'he';
import blueBlob from './Images/blue-blob.jpg'
import yellowBlob from './Images/yellow-blob.jpg'



function App() {

  
  const [trivia , setTrivia] = useState([])
  const [updateTriv, setUpdateTriv] = useState(false)
  const [showCorrectAnswer , setShowCorrectAnswer] = useState(false)
  const [showScore , setShowScore] = useState(false)
  const [score, setScore] = useState()
  const [showQuiz , setShowQuiz] = useState(true)
  const [formData, setFormData] = React.useState({}) 




function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



   React.useEffect(() => {
      
      fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(data => setTrivia(data.results.map(triv => {
          return { 
            questionId: uuid(),
            triviaQuestion: he.decode(triv.question),
            theCorrectAnswer : he.decode(triv.correct_answer),
            answersData: shuffle([{
              ans : he.decode(triv.correct_answer),
              ansId: uuid(),
              /*isChosen: false*/
            },
            {
              ans : he.decode(triv.incorrect_answers[0]),
              ansId: uuid(),
             /*isChosen: false*/
            },
            {
              ans : he.decode(triv.incorrect_answers[1]),
              ansId: uuid(),
             /*isChosen: false*/
            },
            {
              ans : he.decode(triv.incorrect_answers[2]),
              ansId: uuid(),
             /*isChosen: false*/
            }
          ])}

        })))

        

        
        setShowCorrectAnswer(()=>false)
        setShowScore(()=>false)
        
        
        

   },[updateTriv])







   React.useEffect(() => {
      
    
    function setInitialFormData(){

      if(trivia.length){
        /* Setting initial formData with data from trivia */
  
        const questionsArray = trivia.map(triv => {
          return triv.triviaQuestion
        })
        
        
  
        const questionOne = questionsArray[0]
        const questionTwo = questionsArray[1]
        const questionThree = questionsArray[2]
        const questionFour = questionsArray[3]
        const questionFive = questionsArray[4]

        const valueOfKey = "";
  
        const obj = {
        [questionOne]: valueOfKey,
        [questionTwo]: valueOfKey,
        [questionThree]: valueOfKey,
        [questionFour]: valueOfKey,
        [questionFive]: valueOfKey
        }
  
        
  
        setFormData(() => {
          return obj
      })
  
      }else{
        setFormData(prevFormData => {
          return prevFormData
      })
      }
  
  
  
  
  
    }
  
    
     
    setInitialFormData()


 },[trivia])

   const correctAnswersArray = trivia.map(triv => {
    return triv.theCorrectAnswer
   })

   const usersAnswersArray = []



 const checkQuestionsCompleted = Object.keys(formData).every((k) => formData[k]) 
 /* should this be a state, as its only used as a condition for a button i think its fine her*/
 /* actually if i used this as a state i would have been able to render many different componets using this*/
   
   console.log(trivia)
   console.log(correctAnswersArray)
   console.log(formData)
   console.log(checkQuestionsCompleted)
  


   function handleChange(event) {
    (event)
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  } 



   const triviaElements = trivia.length  ? trivia.map(triv => {
                  
                  
    return <TriviaSection key={triv.questionId} 
                        questionId={triv.questionId}
                        question={triv.triviaQuestion} 
                        answersData={triv.answersData}
                        theCorrectAnswer={triv.theCorrectAnswer}
                        showCorrectAnswer={showCorrectAnswer}
                        showScore={showScore}
                        handleChange={handleChange}
                        formData={formData}
                        updateTriv={updateTriv}
                        /*changeColor={changeColor}*/
                        /*handleChange={handleChange}*/
                        /*changeAnswer={changeAnswer}*/
                        /*changeShowQuiz={changeShowQuiz}*/
                        />

}) : []






function changeShowQuiz(){
      
  setShowQuiz(showQuiz  => {
    return !showQuiz 
  })
      
 }

 function changeShowCorrectAnswer(){
      
  setShowCorrectAnswer(showCorrectAnswer  => {
    return !showCorrectAnswer 
  })
      
 }

 function changeShowScore(){
      
  setShowScore(showScore  => {
    return !showScore 
  })
      
 }

function getNewTriv(){
  setUpdateTriv(updateTriv => {
    return !updateTriv
  })
}


 function handleSubmit(event) {
        event.preventDefault()
          changeShowScore()
          changeShowCorrectAnswer()
          
          /* move all the users answers to an array */
          for (let input in formData) {
              usersAnswersArray.push(formData[input]);    
}         
          
          
          /*comparing the two arrays*/
          const correctUserAnswers = correctAnswersArray.filter(x => usersAnswersArray.includes(x));
          setScore(correctUserAnswers.length)
          

    }      

 
const triviaForm = <>

                      <form  onSubmit={handleSubmit}>
                        {triviaElements}
                        <div className='form-buttons'>
                      <button {...(!checkQuestionsCompleted && { disabled: true })} >{!checkQuestionsCompleted ? "Finish to check answers" : "Check answers"}</button>
                             </div> </form>

                  </> 




const endOfQuiz = <>
                      

                      <form  {...(showScore && { className : 'answer-page' })}>
                        {triviaElements}

                      
                       <div className='form-buttons'>
                        <div className='answers-message'>     
                          <p>You scored {score}/5 correct answers </p>
                        </div> 
                       <button id="play-again" type="button" onClick={() => {
                        
                        getNewTriv()
                        changeShowQuiz()
                        
                        }}>Play Again</button>
                        </div>

                      </form> 

                       

                       

                  </>



const pageToShow = showScore ? endOfQuiz : triviaForm


const firstPage = <>

<div className='first-page'>
  <h1>Quizzical</h1>
  <p>A fun trivia quiz to test yourself</p>
 <button id="start-btn" onClick={changeShowQuiz}>Start Quiz</button>
</div>

</>

console.log(score)

  
  return (
    <div className="App">
      <div className="yellow-blob"><img src={yellowBlob}/></div>
      { showQuiz ? firstPage : pageToShow
       }
      <div className="blue-blob"><img src={blueBlob}/></div>  
    </div>
  )
}

export default App



/*const [color, setColor] = useState(false)*/
   

/*
const newTrivia =  <Interests key={1}
getNewTriv={getNewTriv}
changeShowQuiz={changeShowQuiz}
changeShowCorrectAnswer={changeShowCorrectAnswer}

       /> 

 */      


  /*
  const [answers , setAnswers] = useState( [
    {answer: 1,
     isCorrect: false,
     isChosen: false
    },
    { answer: 2,
      isCorrect: false,
      isChosen: false
    },
    { answer: 3,
      isCorrect: false,
      isChosen: false
    },
    { answer: 4,
      isCorrect: false,
      isChosen: false
    },
    { answer: 5,
      isCorrect: false,
      isChosen: false
    }] )
  
*/
   
  

   

  /* function setInitialFormData(){

    if(trivia.length){
      /* Setting initial formData with data from trivia *//*

      const questionIdsArray = trivia.map(triv => {
        return triv.questionId
      })
      
      

      const questionOneId = questionIdsArray[0]
      const questionTwoId = questionIdsArray[1]
      const questionThreeId = questionIdsArray[2]
      const questionFourId = questionIdsArray[3]
      const questionFiveId = questionIdsArray[4]


      const questionOne = questionOneId
      const questionTwo = questionTwoId
      const questionThree = questionThreeId
      const questionFour = questionFourId
      const questionFive = questionFiveId

      const valueOfKey = "";

      const obj = {
      [questionOne]: valueOfKey,
      [questionTwo]: valueOfKey,
      [questionThree]: valueOfKey,
      [questionFour]: valueOfKey,
      [questionFive]: valueOfKey
      }

      console.log(obj)
      console.log('above is the formData in an object')

      setFormData(prevFormData => {
        return obj
    })

    }else{
      setFormData(prevFormData => {
        return prevFormData
    })
    }





  }

  
   
  setInitialFormData()
 */




  
  /*
  let arrayOfAnswers = []

   */

  /* console.log(color)
   


   function changeColor(answerId){
    console.log("color change")
    setColor(prevColor => {
      return !prevColor
    })
    console.log(color)
    console.log(answerId)
    console.log(trivia[0].answersData)

  }
  */
  
  /*
  function changeAnswer(trivId, answerId){
    
    console.log('changing answer state')
    console.log(trivId)
    console.log(answerId)
            setTrivia(trivia.map(triv => {
            
            if (trivId === triv.id){
              return {
              ...triv ,
              answersData: [{
                ans : triv.correct_answer,
                ansId: uuid(),
                isChosen: true
              },
              {
                ans : triv.incorrect_answers[0],
                ansId: uuid(),
                isChosen: false
              },
              {
                ans : triv.incorrect_answers[1],
                ansId: uuid(),
                isChosen: false
              },
              {
                ans : triv.incorrect_answers[2],
                ansId: uuid(),
                isChosen: false
              }]

            }
           } else
            
            {
              return triv
            }
             


            })

        
        
        )
        

console.log(trivia[0].answersData)
  } */

/* A PERFECT EXAMPLE OF NOT WANTING TO IDNETIFY THE PROBLEM BUT JUST GET STUCK IN WASTING TIME, 
SPEND MORE TIME CLARIFYING INSTEAD OF ATTEMPTING BULLSHIT SOLUTIONS 
  const mockTrivia = 
  { questionone: [
     {
        id : 1,
        question : "what is 1", 
        answers : ["1" , "one" , "hal" , "kow" ],
        rightAnswer: "1"
     },
     {
       id : 2,
       question : "what is 2", 
       answers : ["2" , "two" , "labo" , "dos" ],
       rightAnswer: "2"
     },
     {
        id : 3,
        question : "what is 3", 
        answers : ["3" , "three" , "sadax" , "thalatha" ],
        rightAnswer: "3"
     },  
     {  
      id : 4,
      question : "what is 4", 
      answers : ["4" , "four" , "afar" , "arba" ],
      rightAnswer: "4"
    
     },
     {
      id : 5,
      question : "what is 5", 
      answers : ["5" , "five" , "shan" , "khamsa" ],
      rightAnswer: "5"
     }
  ]
}
 
*/




/*
function handleChange(event) {
  console.log(event)
  const {name, value, type, checked} = event.target
  setFormData(prevFormData => {
      return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked : value
      }
  })
} */



 /*  const triviaElements = trivia.length  ? trivia.map(triv => {
                  
                  
    return <TriviaSection key={triv.questionId} 
                        id={triv.questionId}
                        question={triv.triviaQuestion} 
                        answersData={triv.answersData}
                        theCorrectAnswer={triv.theCorrectAnswer}
                        showCorrectAnswer={showCorrectAnswer}
                        /*changeColor={changeColor}*/
                        /*handleChange={handleChange}*/
                        /*changeAnswer={changeAnswer}*/
                        /*changeShowQuiz={changeShowQuiz}*//*
                        />

}) : [] */



/*const questionIdsArray = trivia.map(triv => {
  return triv.questionId
})

console.log(questionIdsArray) */

/*
const questionOneId = questionIdsArray[0]
const questionTwoId = questionIdsArray[1]
const questionThreeId = questionIdsArray[2]
const questionFourId = questionIdsArray[3]
const questionFiveId = questionIdsArray[4]


function initialFormData(){

/* STACKOVERFLOW used when couldnt assign object key to variable */

/*  const formDataObjArray = questionIdsArray.map(question => {

    const yourKeyVariable = question;
    const someValueArray= "";

    const obj = {
    [yourKeyVariable]: someValueArray,
    }
    return obj
  })

  return formDataObjArray
  */
/*

    const questionOne = questionOneId
    const questionTwo = questionTwoId
    const questionThree = questionThreeId
    const questionFour = questionFourId
    const questionFive = questionFiveId

    const valueOfKey = "";

    const obj = {
    [questionOne]: valueOfKey,
    [questionTwo]: valueOfKey,
    [questionThree]: valueOfKey,
    [questionFour]: valueOfKey,
    [questionFive]: valueOfKey
    }

    return obj
   


}      

console.log(formData)

*/

/*
console.log(triviaElements)
console.log(arrayOfAnswers)
console.log(answers)
*/

