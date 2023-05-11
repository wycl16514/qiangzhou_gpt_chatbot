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
                        <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" key={index}>
                            <input
                                class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioAnswer" />
                            <label
                                class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                for="radioAnswer">
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