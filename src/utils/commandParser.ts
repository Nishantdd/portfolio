import responses from './commands.json';

const getTokens = (s: string) : string[] => {
    if(s.length === 0) return [''];
    return s.trim().split(' ');
}

const resolve = (res: any) => Promise.resolve(res);

const parser = async (query: string): Promise<string> => {
    if(query.length === 0) return Promise.resolve('');
    const tokens = getTokens(query);
    
    const ctx = {
        command: tokens[0],
        parameters: tokens.slice(1)
    }

    const availableCommands: string[] = Object.keys(responses);
    if(availableCommands.find(value => value === ctx.command)){
        return resolve(responses[ctx.command as keyof typeof responses]);
    } else {
        return resolve(`shell: command not found: ${ctx.command}. Try 'help' to get started.`)
    }
};

export { parser };
