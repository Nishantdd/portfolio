export async function GET() : Promise<Response> {
    try {
        const response = await fetch('https://quotes-api-self.vercel.app/quote');
        const { quote, author } : { quote: string, author: string } = await response.json();
        return Response.json({
            success: true,
            quote,
            author
        }, {status: 200});
    } catch (err) {
        console.error("Error occured while fetching random quotes: ", (err as Error).message);
        return Response.json({
            success: false,
            quote: "API fails sometimes",
            author: "Nishant"
        }, {status: 500})
    }
}