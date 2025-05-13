import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContext: {
        width:"100%",
        height:"100%",
        bottom:0,
        backgroundColor:"#ffffff",
        alignItems:"center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginTop:30,
    },
    form:{
        width:"100%",
        height:"auto",
        marginTop:30,
        padding:10
    },
    formLabel:{
        color:"#000000",
        fontSize:18,
        paddingLeft:20
    },
    input:{
        width:"90%",
        borderRadius:50,
        backgroundColor:"#f6f6f6",
        height:40,
        margin:12,
        paddingLeft:10,
    },
    textButtonCalculator:{
        fontSize:20,
        color:"#ffffff",
    },
    buttonCalculator:{
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        width:"90%",
        backgroundColor:"#ca221f",
        paddingTop:14,
        paddingBottom:14,
        marginLeft:12,
        marginBottom:5,
    },
    errorMessage:{
        fontSize:12,
        color:"red",
        fontWeight:"bold",
        paddingLeft:20,
    },
    exhibitionResultImc:{
        width:"100%",
        height:"26%",
        marginTop:50,
        padding:10
    },
    viewResultList:{
        height:"35%",
        marginTop:20,
    },
    resultImcItem:{
        fontSize:24,
        color:"red",
        height:50,
        width:"100%",
        // paddingRight:20,
    },
    textResultItemList:{
        fontSize:18
    },
    imcClassificationText: {
        fontSize: 18,
        color: "#ca221f",
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold",
      },
})

export default styles;