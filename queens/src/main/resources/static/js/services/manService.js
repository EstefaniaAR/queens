class Services 
{
	constructor ()
	{
        
	}
	getData(timeout=1000,url)
	{
        fetch(url)
        .then(status)
        .then(json)
    }
    status(response) 
    {
        if (response.status >= 200 && response.status < 300) 
        {
            return Promise.resolve(response);
        } 
        else 
        {
            return Promise.reject(new Error(response.statusText));
    };

    json(response)
    {
        return response.json();
    };
    }
}