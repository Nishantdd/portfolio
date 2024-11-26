'use client'
import query from '@/types/query';
import Prompt from './Prompt';
import { useState } from 'react'

function Terminal() {
    const [userInput, setUserInput] = useState("");
    const [prevQueries, setPrevQueries] = useState<query[]>([{command: "echo hello", output: "hello"}]);
    return (
        <div className='h-screen w-screen p-2 font-ibm-mono'>
            <div className='p-8 w-full h-full rounded-xl border-white border-2'>
                <div className='flex flex-col'>
                    <div className='ml-2 mb-8'>
                        <pre>
                            {`___       __    ______                            
__ |     / /_______  /__________________ ________ 
__ | /| / /_  _ \\_  /_  ___/  __ \\_  __ \`__ \\  _ \\
__ |/ |/ / /  __/  / / /__ / /_/ /  / / / / /  __/
____/|__/  \\___//_/  \\___/ \\____//_/ /_/ /_/\\___/
`}
                        </pre>
                        <div className="flex flex-col mt-4">
                            <p>Type 'help' to see the list of available commands</p>
                            <p>Type 'fetch' to display summary</p>
                            <p>Type 'resume' or click <a href='drive.google.com' className='underline'>here</a> to view resume</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start gap-2'>
                        {prevQueries.map((query, index) => (
                            <div key={index}>
                                <div className='flex flex-row space-x-2'>
                                    <Prompt />
                                    <div className='flex-grow'>{query.command}</div>
                                </div>
                                <p className='whitespace-pre-wrap'>{query.output}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terminal