import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
                                            
export const CustomCalendarToolbar = ({ onClick_prevBtn, onClick_nextBtn, currentCalendarDate,
    titlePrefix }) => {
    return <>
        <div class="row rbc-toolbar">
            <div class="col-12  col-xl-10  text-center  order-xl-2 rbc-toolbar-label">
                {titlePrefix} {MONTHS[currentCalendarDate.month()]} {currentCalendarDate.year()}
            </div>
            <div class="col-6  col-xl-1  text-start  order-xl-1">
                <button type="button" onClick={onClick_prevBtn}>
                    <FontAwesomeIcon icon={faArrowLeft} size={'lg'} />
                </button>
            </div>
            <div class="col-6 col-xl-1  text-end  order-xl-3">
                <button type="button" onClick={onClick_nextBtn}>
                    <FontAwesomeIcon icon={faArrowRight} size={'lg'} />
                </button>
            </div>
        </div>
    </>
}