
const buscaApi = async(cidade)=>{
    try{
        const chave = '1b83ba0a5e8b9652e01ec52f0f1dd40d'
        return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=${chave}`)
        .then(resposta=>resposta.json())
    }catch (error){
        return (error)
    }
}
