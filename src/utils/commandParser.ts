const getTokens = (s: string) : string[] => {
    if(s.length === 0) return [''];
    return s.trim().split(' ');
}

const parser = async (query: string): Promise<string> => {
    const tokens = getTokens(query);
    if(tokens.length === 0) return Promise.resolve('');
    
    const ctx = {
        command: tokens[0],
        parameters: tokens.slice(1)
    }

    switch(ctx.command){
        case 'about':
            return `Hi, I am Nishant.\nWelcome to my terminal styled portfolio website!\nMore about me:\n'fetch' - short summary\n'resume' - my latest resume\n'readme' - my github readme`
    }
    
    return Promise.resolve("");
};

export { parser };
