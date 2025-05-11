import React, { useState } from "react"
import { 
    TextInput, 
    View, 
    Text, 
    TouchableOpacity,
    Vibration,
    FlatList,
    Pressable,
    Keyboard, 
} from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){
    const [height, setHeight]= useState(null)
    const [weight, setWeight]= useState(null)
    const [messageImc, setMessageImc]= useState("Preencha o peso e altura")
    const [imc, setImc]= useState(null)
    const [textButton, setTextButton]= useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])

    function imcCalculator() {
        const heightFormat = parseFloat(height.replace(',','.'))
        const newImc = (parseFloat(weight.replace(',','.'))/(heightFormat*heightFormat)).toFixed(2)
        const countList = imcList.length
        setImcList((arr) => [...arr, {id: countList+1, imc: newImc}])
        setImc(newImc)
        console.log(imcList)
    }

    function verificationImc() {
        if(imc == null) {
            Vibration.vibrate()
            setErrorMessage("campo obrigatório*")
        }
    }

    function validationImc(){
        if(weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        } else {
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e altura")
        }
    }


    return (
        // <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
        <View style={styles.formContext}>
            { imc == null ? 
                <View style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1,75"
                    keyboardType="numeric"
                    />    
                    
                    
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 75,500"
                    keyboardType="numeric"
                    />
                </View>
            :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                </View>
            }
            <TouchableOpacity style={styles.buttonCalculator} onPress={()=> validationImc()} >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>

            <View style={styles.viewResultList}>
                <FlatList 
                    style={styles.listImc}
                    data={imcList.slice().reverse()}
                    renderItem={({item}) => 
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    }
                    keyExtractor={(item) =>item.id}
                />
            </View>
        {/* </Pressable> */}
        </View>
    );
}