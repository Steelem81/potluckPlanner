
const InvitedList = props => {
    const invitations = props.invitationsProp;
    console.log(invitations)
    return (
        // <></>
        <>
        <div className="container m-3">
        {invitations ?
            invitations.map((invite, index) => {
            return (
            <p key={index}> {invite.invitedUser.firstName} {invite.invitedUser.lastName} - {invite.invitationStatus} - {invite.dish}</p>
            )
        }):null}
        </div>
        </>
    )
}

export default InvitedList