/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 

function regSProc(email, username, password, first, last, phone){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "registerProc",
		parameters: [email, username, password, first, last, phone]
	});
}

function addEvent(username, name, description, location, dateTime, text, push, email){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "addEvent",
		parameters: [username, name, description, location, dateTime, text, push, email]
	});
}

function editEvent(id, name, description, location, dateTime, text, push, email){	return WL.Server.invokeSQLStoredProcedure({
		procedure: "editEvent",
		parameters: [id, name, description, location, dateTime, text, push, email]
	});
}

function deleteEvent(id){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "deleteEvent",
		parameters: [id]
	});
}

function logProc(username, password) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "loginProc",
		parameters : [username, password]
	});
}

function getDayEvents(username, dateTime, finishDateTime) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "getDayEventProc",
		parameters: [username, dateTime, finishDateTime]
	});	
}

function addGroupProc(name, description, user){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "addGroup",
		parameters: [name, description, user]
	});
}

function getGroups(userID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "getGroupsProc",
		parameters: [userID]
	});
}

function getGroupMembers(groupID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "getGroupMembersProc",
		parameters: [groupID]
	});
}

function getGroupEvents(groupID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "getGroupEventsProc",
		parameters: [groupID]
	});
}

function getUserId(username) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "getUserId",
		parameters: [username]
	});
}

function leaveGroup(userID, groupID){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "leaveGroup",
		parameters: [userID, groupID]
	});
}

function editGroup(groupID, groupName, groupDesc){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "editGroup",
		parameters: [groupID, groupName, groupDesc]
	});
}

function addGroupEvent(groupID, name, description, location, dateTime){
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "addGroupEvent",
		parameters: [groupID, name, description, location, dateTime]
	});
}

function addGroupMember(username, position, groupID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "addGroupMemberProc",
		parameters: [username, position, groupID]
	});
}

function addAlert(event, time, type) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure: "addAlertProc",
		parameters: [event, time, type]
	});
}


//Adapter specific Back-end methods

function getAccount() {
	return WL.Server.getActiveUser("AdapterAuthRealm");
}

function storeUser(username, inemail, first, last, inphone)
{
		WL.Server.setActiveUser("AdapterAuthRealm", null);
		var userIdentity = {
				userId: username,
				displayName: first + " " + last, 
				attributes: {
					email: inemail,
					phone: inphone,
				}
		};
		
		WL.Server.setActiveUser("AdapterAuthRealm", userIdentity);
	
		return { 
			authRequired: false 
		};
}

function onAuthRequired(headers,errorMessage)
{
	errorMessage = errorMessage ? errorMessage:null;
	return {
		authRequired:true,
		errorMessage:errorMessage
	};
}

function onLogout()
{
	WL.Server.setActiveUser("AdapterAuthRealm", null);
	WL.Logger.debug("Logged out");
}


