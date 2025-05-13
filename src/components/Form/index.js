import React, { useState } from "react"
import { 
    TextInput, 
    View, 
    Text, 
    TouchableOpacity,
    Vibration,
    FlatList,
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
    const [imcClassification, setImcClassification] = useState(null)


    function imcCalculator() {
        const heightFormat = parseFloat(height.replace(',','.'))
        const newImc = (parseFloat(weight.replace(',','.'))/(heightFormat*heightFormat)).toFixed(2)
        const countList = imcList.length
        setImcList((arr) => [...arr, {id: countList+1, imc: newImc}])
        setImc(newImc)
        setImcClassification(getImcClassification(newImc))
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

    function getImcClassification(imcValue) {
        const imc = parseFloat(imcValue);
        if (imc < 18.5) return "Magreza";
        if (imc >= 18.5 && imc < 25) return "Peso normal";
        if (imc >= 25 && imc < 30) return "Sobrepeso";
        if (imc >= 30 && imc < 35) return "Obesidade grau I";
        if (imc >= 35 && imc < 40) return "Obesidade grau II (severa)";
        return "Obesidade grau III (mórbida)";
      }


    return (
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

            {imc && (
                <Text style={styles.imcClassificationText}>
                    Classificação IMC: {imcClassification}
                </Text>
            )}

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
        </View>
    );
}