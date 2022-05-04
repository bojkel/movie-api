const axios = require('axios');
const series_url = "https://api.tvmaze.com/shows";
const responseService = require('../services/response_service');

exports.getSeries = (req,res) => {
    axios.get(series_url)
    .then(response=>{
        const series = response.data
        const result = {
            Series_Couunt: series.length,
            Serie_Data: series.map(serie=>{
                return {
                    ID: serie.id,
                    Name: serie.name 
                }
            })
        }
        return res.status(200).json({
            message:'series fetched',
            series: result
        })
    }).catch(err=>{
        console.log('error: ', err)
    })
}

exports.getSeriesById = (req,res) => {

    axios.get(series_url+"/"+req.params.id)
    .then(response=>{
        const serie = response.data
        if(serie.length === 0){
            return res.status(404).json(responseService.noDataMessage('serie'))
        }
        else{
            const fetchedSerie = {
                ID: serie.id,
                Name: serie.name
            }
            return res.status(200).json(responseService.getByProperty('serie', 'id', fetchedSerie))
        }
    }).catch(err=>{
        if(err){
            return res.status(404).json(responseService.getErrorMessage('serie', false, err))
        }
    })
}