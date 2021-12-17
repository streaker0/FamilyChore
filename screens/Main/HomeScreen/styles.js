import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
		marginLeft: 30,
		marginBottom:50,
    },
	button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
		position: 'absolute',
        alignItems: "center",
        justifyContent: 'center'
    },
	settingsButton:{
		bottom:0,
		left:0,
	},
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    logo: {
        flex: 1,
        height: 90,
        width: 90,
    },
	settingsTab:{
		height:100,
		position: 'fixed',
		bottom: '2%',
		width: '100%',
		backgroundColor: '#393838',
		opacity: 1,
	},
    horizLine: {
        height:0.5,
		backgroundColor: 'grey',
    },
	viewStyle:{
		paddingHorizontal:20,
		paddingBottom:20,
		paddingTop:20,
	},
	textStyle:{
		fontSize:17,
	},
	containerStyle:{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
	},headerStyle:{
		fontSize:29,
		fontWeight: "bold",
		marginLeft: 15,
	}
})