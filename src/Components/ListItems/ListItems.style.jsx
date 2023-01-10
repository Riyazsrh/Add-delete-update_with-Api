import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    card: {
        width: 250,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: 3
    },
    divider: {
        margin: "8px 0px !important",
        backgroundColor: 'red',
    },
    heading: {
        fontWeight: "bold !important"
    },
    img: {
        borderRadius: "50px",
        border: "1px solid black",
        height: "200px",
        width: "160px"
    }

})

