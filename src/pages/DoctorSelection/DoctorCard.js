import {
    Card, OverlayTrigger, Tooltip
} from 'react-bootstrap'
import _ from 'lodash';
import './doctorCard.css'

const truncate = (str) => {
    return str.length > 89 ? str.substring(0, 89) + "..." : str;
}//may apply usememo?

export const DoctorCard = ({ isSelected, aDoctor, imgSrc, onClick_card }) => {
    const truncatedQualication = truncate(aDoctor.qualification);
    return <Card className={`baseBlock ${isSelected ? 'cardSelected' : ''}`} onClick={() => onClick_card(aDoctor)}>
        <Card.Img variant="top" className="card-img-top"
            src={imgSrc} />
        <Card.Body className="text-center">
            <Card.Title>{aDoctor.name}{` ${aDoctor.id}`}</Card.Title>
            <Card.Text>
                {_.isEqual(truncatedQualication, aDoctor.qualification) ? aDoctor.qualification : <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip className="mytooltip" >
                            {aDoctor.qualification}
                        </Tooltip>
                    }>
                    <a>{truncatedQualication}</a>
                </OverlayTrigger>}
            </Card.Text>
        </Card.Body>
    </Card>
}