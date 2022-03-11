import { createServer, Response } from 'miragejs';
import _ from 'lodash';
export function makeServer({ environment = 'test' } = {}) {
    let server = createServer({
        environment,
        routes() {
            this.namespace = "api/v1";
            this.get('/available-doctor-sessions', (schema, request) => {
                const doctorID = request.queryParams.doctorID;
                if (_.isUndefined(doctorID)) {
                    return new Response(400, { errors: ['missing required params'] });
                }
                switch (doctorID) {
                    case '1':
                        return availableSessions_doctor1
                    case '2':
                        return availableSessions_doctor2
                    default:
                        return [];
                }
            });
            this.get('/doctors', (schema, request) => {
                return doctors;
            });
        },
    });
    return server;
}

//dummy data
const doctors = [
    {
        id: '1',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology)'
    },
    {
        id: '2',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '3',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '4',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '5',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '6',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '7',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '8',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '9',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '10',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '11',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    },
    {
        id: '12',
        name: 'Dr Chan Tai Man',
        qualification: 'MBBS (HK), M.Med (Ophth)(Singapore), Dip.Med (CUHK), FRCSEd (Ophth), FHKAM(Ophthalmology), FCOphth HK, Clinical Assistant Professor (Honorary) CUHK (DOVS)'
    }
]

//dummy data
//the following are available sessions
const availableSessions_doctor1 = [
    {
        id: '1',//session id
        doctorID: '1',
        title: 'All Day Event very long title',
        start: new Date(2022, 0, 25, 14, 0),
        end: new Date(2022, 0, 25, 15, 0),
    },
    {
        id: '2',
        doctorID: '1',
        title: 'Long Event',
        start: new Date(2022, 0, 25, 15, 0),
        end: new Date(2022, 0, 25, 16, 0),
    },
    {
        id: '3',
        doctorID: '1',
        title: 'Long Event',
        start: new Date(2021, 8, 24, 16, 0),
        end: new Date(2021, 8, 24, 17, 0),
    },
    {
        id: '4',
        doctorID: '1',
        title: 'Long Event',
        start: new Date(2021, 8, 25, 16, 0),
        end: new Date(2021, 8, 25, 17, 0),
    },
    {
        id: '5',
        doctorID: '1',
        title: 'Long Event',
        start: new Date(2021, 8, 25, 11, 0),
        end: new Date(2021, 8, 25, 12, 0),
    },
]

const availableSessions_doctor2 = [{
    id: '6',
    doctorID: '2',
    title: 'All Day Event very long title',
    start: new Date(2021, 8, 26, 14, 0),
    end: new Date(2021, 8, 26, 15, 0),
},
{
    id: '7',
    doctorID: '2',
    title: 'Long Event',
    start: new Date(2021, 8, 26, 15, 0),
    end: new Date(2021, 8, 26, 16, 0),
},
{
    id: '8',
    doctorID: '2',
    title: 'Long Event',
    start: new Date(2021, 8, 26, 16, 0),
    end: new Date(2021, 8, 26, 17, 0),
},
{
    id: '9',
    doctorID: '2',
    title: 'Long Event',
    start: new Date(2021, 8, 27, 16, 0),
    end: new Date(2021, 8, 27, 17, 0),
},
{
    id: '10',
    doctorID: '2',
    title: 'Long Event',
    start: new Date(2021, 8, 27, 11, 0),
    end: new Date(2021, 8, 27, 12, 0),
},
{
    id: '11',
    doctorID: '2',
    title: 'Long Event',
    start: new Date(2021, 8, 27, 9, 0),
    end: new Date(2021, 8, 27, 10, 0),
}]