/* Lógica de la API */

import { google } from "googleapis";
import { oauth2Client } from "../config/googleOAuth";

/* Obtiene url de acceso para acceder a Google Calendar */
export const getAuthUrl = (userId: string) => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    state: userId
  });
};

/* Almacena los tokens del usuario */
export const getTokens = async (code: string) => {
  const {tokens} = await oauth2Client.getToken(code);
  return tokens;
};

export const createCalendarEvent = async (
  refreshToken: string,
  event: any
) => {

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
  });

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event
  });

  return response.data;
};