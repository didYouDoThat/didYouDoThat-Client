import { View, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>준비중입니다...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,         
    justifyContent:'center',         
    alignItems:'center',         
    backgroundColor: '#fdc453',
  },
  title: {
    fontSize:20,
    fontWeight:'700'
  },
}); 

export default LoadingScreen;
