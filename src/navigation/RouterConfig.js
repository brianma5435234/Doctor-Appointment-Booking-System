import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "navigation/NotFound";
import {
  ROOT, MAKE_APPOINTMENT,
  MAKE_APPOINTMENT_STEP1, MAKE_APPOINTMENT_STEP2, MAKE_APPOINTMENT_STEP3, OUR_TEAM, CONTACT_US
} from "navigation/CONSTANTS";
import DoctorSelection from "pages/DoctorSelection";
import SessionSelection from "pages/SessionSelection";
import AppointmentForm from "pages/AppointmentForm";
import Home from "pages/Home";
import OurTeam from "pages/OurTeam";
import ContactUs from "pages/ContactUs";

export const RouterConfig = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROOT} component={Home} />
        <Route path={MAKE_APPOINTMENT}
          render={({ match: { path } }) => (
            <>
              <Switch>
                <Route exact path={MAKE_APPOINTMENT_STEP1} component={DoctorSelection} />
                <Route exact path={MAKE_APPOINTMENT_STEP2} component={SessionSelection} />
                <Route exact path={MAKE_APPOINTMENT_STEP3} component={AppointmentForm} />
              </Switch>
            </>
          )}
        >
        </Route>
        <Route exact path={OUR_TEAM} component={OurTeam} />
        <Route exact path={CONTACT_US} component={ContactUs} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};
