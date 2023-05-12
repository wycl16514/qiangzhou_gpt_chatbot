import React from 'react'
import { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { useGetExamMutation } from "@/state/api"


const RIGHT_WRONG_QUESTION_COUNT = 70
const SINGLE_SELETION_QUESTION_COUNT = 30

function Exam() {
    const [triggerGetExam, examResult] = useGetExamMutation();
    const [examReady, setExamReady] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('')
    const [answers, setAnswers] = useState([])
    const [examQuestionArray, setExamQuestionArray] = useState([])
    const [examRW, setExamRW] = useState(undefined);
    const [examSingle, setExamSingle] = useState(undefined);
    const [correctAnswer, setCorrectAnswer] = useState('错')
    const [questionCount, setQuestionCount] = useState(0)
    const [radioClicked, setRadioClicked] = useState(null);
    const [answerResult, setAnswerResult] = useState('')

    useEffect(() => {
        triggerGetExam({ title: '低压电工' });
    }, [])

    useEffect(() => {
        if (examRW && questionCount <= RIGHT_WRONG_QUESTION_COUNT) {
            const answer = examRW[examQuestionArray[questionCount]];
            setCorrectAnswer(answer);
        } else if (examSingle) {
            const qes = examQuestionArray[questionCount];
            setCorrectAnswer(examSingle[qes][0]);
        }

    }, [answers])

    useEffect(() => {
        console.log('set exam qes array')
        if (examQuestionArray) {
            setQuestionTitle(examQuestionArray[questionCount]);
            setExamReady(true)
            setAnswerByQuestionIndex();
        }

    }, [examQuestionArray])

    useEffect(() => {
        if (examRW && examSingle) {
            let questions = Array.from(Object.keys(examRW))
            questions = questions.concat(Array.from(Object.keys(examSingle)))
            setExamQuestionArray(questions)
        }
    }, [examRW, examSingle])

    useEffect(() => {
        if (examResult?.data) {
            setExamRW(examResult.data.data.rw_map);
            setExamSingle(examResult.data.data.single_map);
        }

    }, [examResult.data])

    const setAnswerByQuestionIndex = () => {
        console.log('set answer by qes index')
        if (!examRW || !examSingle) {
            return
        }

        if (questionCount <= 70) {
            setAnswers(['对', '错']);
        } else {
            const qes = examQuestionArray[questionCount];
            setAnswers(examSingle[qes][1]);
        }
    }

    const prevSlide = () => {
        if (questionCount == 0) {
            return
        }
        radioClicked.checked = false
        setQuestionCount(questionCount - 1)
        setQuestionTitle(examQuestionArray[questionCount])
        setAnswerByQuestionIndex()
        setAnswerResult('')
    };

    const nextSlide = () => {
        if (questionCount == 100) {
            return
        }
        radioClicked.checked = false
        setQuestionCount(questionCount + 1)
        setQuestionTitle(examQuestionArray[questionCount])
        setAnswerByQuestionIndex()
        setAnswerResult('')
    };

    const answerSelect = (e) => {
        console.log('radio id: ', e.target.id);
        const selector = 'label[for=' + e.target.id + ']'
        const label = document.querySelector(selector)
        const text = label.innerHTML;
        console.log('label text: ', text)
        console.log('correct answer: ', correctAnswer)
        if (correctAnswer === text.charAt(0)) {
            console.log('answer correct')
            setAnswerResult('正确')
        } else {
            console.log('answer error')
            setAnswerResult('错误')
        }
        setRadioClicked(e.target)
    }

    return (
        <div className="h-full w-full m-auto py-16 px-4 relative">
            <div class="pl-8">
                {examReady && <p>{questionTitle}</p>}

                {answers.map((item, index) => {
                    return (
                        <div className="flex items-center mb-4" key={index}>
                            <input id={`radio-${index}`} type="radio" name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100
                              border-gray-300 focus:ring-blue-500 
                             dark:focus:ring-blue-600 
                             dark:ring-offset-gray-800 focus:ring-2
                              dark:bg-gray-700 dark:border-gray-600"
                                onClick={answerSelect}
                            />
                            <label for={`radio-${index}`}
                                className="ml-2 text-lg font-medium ">
                                {item}
                            </label>
                        </div>
                    )
                })
                }


                {answerResult === '正确' && <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal">回答正确</div>
                </div>
                }

                {answerResult === '错误' && <div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Error icon</span>
                    </div>
                    <div class="ml-3 text-sm font-normal">回答错误</div>

                </div>}

            </div>
            <div className='group-hover:block absolute mt-5 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='group-hover:block absolute mt-5 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div >
    )
}

export default Exam;