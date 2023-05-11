import React from 'react'
import { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { useGetExamMutation } from "@/state/api"
function Exam() {
    const [triggerGetExam, examResult] = useGetExamMutation();
    const [examReady, setExamReady] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('')
    const [answers, setAnswers] = useState([])
    let correctAnswer = '错';
    let examRW = {};
    let examQuestionArray = [];
    let examSingle = {};
    let questionCount = 0;

    useEffect(() => {
        console.log("get exam data");
        triggerGetExam({ title: '低压电工' });
    }, [])

    useEffect(() => {
        if (questionCount <= 70) {
            correctAnswer = examRW[examQuestionArray[questionCount]];
        } else {
            correctAnswer = (examSingle[examQuestionArray[questionCount]])[0];
        }

    }, [answers])

    useEffect(() => {
        if (examResult?.data) {
            examRW = examResult.data.data.rw_map;
            examSingle = examResult.data.data.single_map;
            console.log('exam rw: ', examRW)
            console.log('exam single: ', examSingle)

            examQuestionArray = Array.from(Object.keys(examRW))
            examQuestionArray = examQuestionArray.concat(Array.from(Object.keys(examSingle)))
            console.log('exam question array: ', examQuestionArray[questionCount])
            setQuestionTitle(examQuestionArray[questionCount])
            setExamReady(true)
            setAnswers(['对', '错'])
        }

    }, [examResult.data])

    const prevSlide = () => {
        if (questionCount > 0) {
            questionCount--;
        }
    };

    const nextSlide = () => {
        if (questionCount < 100) {
            questionCount++;
        }
    };


    return (
        <div className="h-full w-full m-auto py-16 px-4 relative">
            <div class="pl-8">
                {examReady && <p>{questionTitle}</p>}

                {answers.map((item, index) => {
                    return (
                        <div className="flex items-center mb-4" key={index}>
                            <input id="default-radio-1" type="radio" name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100
                              border-gray-300 focus:ring-blue-500 
                             dark:focus:ring-blue-600 
                             dark:ring-offset-gray-800 focus:ring-2
                              dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label for="default-radio-1"
                                className="ml-2 text-lg font-medium ">
                                {item}
                            </label>
                        </div>
                    )
                })
                }

            </div>
            <div className='group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} />
            </div>
            <div className='group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div >
    )
}

export default Exam;