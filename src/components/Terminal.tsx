'use client';
import query from '@/types/query';
import Prompt from './Prompt';
import { parser } from '@/utils/commandParser';
import React, { useState } from 'react';

function Terminal() {
    const [userInput, setUserInput] = useState('');
    const [prevQueries, setPrevQueries] = useState<query[]>([]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const command = userInput;
        const output = await parser(command);

        setPrevQueries(prev => [
            ...prev,
            {
                command,
                output
            }
        ]);

        setUserInput('');
    };

    return (
        <div className="h-screen w-screen p-2 font-ibm-mono">
            <div className="h-full w-full rounded-xl border-2 border-white p-8 overflow-y-auto">
                <div className="flex flex-col">
                    <div className="mb-8 ml-2">
                        <pre>
                            {`___       __    ______                            
__ |     / /_______  /__________________ ________ 
__ | /| / /_  _ \\_  /_  ___/  __ \\_  __ \`__ \\  _ \\
__ |/ |/ / /  __/  / / /__ / /_/ /  / / / / /  __/
____/|__/  \\___//_/  \\___/ \\____//_/ /_/ /_/\\___/
`}
                        </pre>
                        <div className="mt-4 flex flex-col">
                            <p>Type 'help' to see the list of available commands</p>
                            <p>Type 'fetch' to display summary</p>
                            <p>
                                {"Type 'resume' or click "}
                                <a
                                    href="https://drive.google.com/file/d/1e-aZEhiXeUC6Nnr8HvIF0VjaSw2v1zjo/view?usp=sharing"
                                    target="_blank"
                                    className="underline">
                                    here
                                </a>
                                {' to view resume'}
                            </p>
                        </div>
                    </div>
                    <div className={`${prevQueries.length > 0 && "mt-2"} flex flex-col gap-2`}>
                        {prevQueries.map((query, index) => (
                            <div key={index}>
                                <div className="flex flex-row space-x-2">
                                    <Prompt />
                                    <div className="flex-grow">{query.command}</div>
                                </div>
                                <p className="whitespace-pre-wrap">{query.output}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommand} className='mt-2'>
                        <div className="flex flex-row space-x-2">
                            <Prompt />
                            <input
                                type="text"
                                value={userInput}
                                onChange={e => setUserInput(e.target.value)}
                                placeholder="Start typing a command..."
                                className="flex-grow bg-transparent focus:border-transparent focus:outline-none"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Terminal;
