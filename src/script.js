const chave = '1b83ba0a5e8b9652e01ec52f0f1dd40d';
const busca = document.getElementById('busca');
const nomeCidade = document.getElementById('cidade');
const temperatura = document.getElementById('temperatura')
const sensacao = document.getElementById('sens-termica');
const maxima = document.getElementById('maxima');
const minima = document.getElementById('minima');
const humidade = document.getElementById('humidade');
const vento = document.getElementById('vento');
const descricao = document.getElementById('descricao');
const icon = document.getElementById('icon');
const btnSearch = document.getElementById('btn-procurar');

btnSearch.addEventListener('click',async()=>{
    const localidade = busca.value;
    const corre = await criaCartao(localidade)
})

busca.addEventListener('keyup',async(event)=>{
    if((event.key == "Enter")){
    const localidade = busca.value;
    const corre = await criaCartao(localidade)
}
})

//Pega LAT e LON da cidade
const pegaLocal = async(cidade)=>{
    const local =await buscaApi(cidade)
    const {lat , lon} = local[0]
    return [lat, lon]
}


// Busca o Tempo para as Lat Long
const buscaTempoApi = async(cidade)=>{
    const cidadeLatLon = await pegaLocal(cidade);
    const [lat, lon] = cidadeLatLon;
    try{
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=pt_br`)
        .then(resposta=>resposta.json())
    }catch (error){
        return (error)
    }
}

// Gera o cartão com os dados da cidade
const criaCartao = async(local)=>{
    const resultado = await buscaTempoApi(local)
    const {main ,name , wind , weather} = resultado
    const {temp, temp_max, temp_min, feels_like, humidity} = main
    
    nomeCidade.innerHTML = name;
    temperatura.innerHTML = `Temperatura é de : <span>${ Math.round(temp)}Cº</span>`
    sensacao.innerHTML = `Sensação termica é de : <span>${Math.round(feels_like)}Cº</span>`
    maxima.innerHTML = `Máxima de : <span>${Math.round(temp_max)}Cº</span>`
    minima.innerHTML = `Minima de : <span>${Math.round(temp_min)}Cº</span>`
    descricao.innerHTML = `<span>${weather[0].description}</span>`
    vento.innerHTML= `Velocidade vento de: <span>${wind.speed} Km/H</span>`
    humidade.innerHTML = `Humidade de : <span>${humidity}%</span>`
    icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`   
}

window.onload=()=>{
    criaCartao('Belo Horizonte')
}
