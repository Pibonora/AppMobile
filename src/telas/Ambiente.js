// Ambiente.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { auth, db } from '../config/firebase';;
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, set, push, onValue, remove } from 'firebase/database';

const Ambiente = () => {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState('');
  const [perguntasRespostas, setPerguntasRespostas] = useState([{ pergunta: '', resposta: '' }]);
  const [registros, setRegistros] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRegistro, setEditRegistro] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [estudarRegistro, setEstudarRegistro] = useState(null);
  const [estudarModalVisible, setEstudarModalVisible] = useState(false);
  const [currentPerguntaIndex, setCurrentPerguntaIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}/registros`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setRegistros(Object.entries(snapshot.val()));
          } else {
            setRegistros([]);
          }
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const adicionarPerguntaResposta = () => {
    if (perguntasRespostas.some(pr => !pr.pergunta || !pr.resposta)) {
      Alert.alert("Por favor, preencha todas as perguntas e respostas.");
      return;
    }
    const userId = user.uid;
    const userRef = ref(db, `users/${userId}/registros`);
    const newRegistroRef = push(userRef);
    set(newRegistroRef, {
      nome,
      perguntasRespostas
    }).then(() => {
      Alert.alert('Perguntas e respostas salvas com sucesso!');
      setNome('');
      setPerguntasRespostas([{ pergunta: '', resposta: '' }]);
    });
  };

  const adicionarCampoPerguntaResposta = () => {
    setPerguntasRespostas([...perguntasRespostas, { pergunta: '', resposta: '' }]);
  };

  const handlePerguntaRespostaChange = (index, field, value) => {
    const newPerguntasRespostas = [...perguntasRespostas];
    newPerguntasRespostas[index][field] = value;
    setPerguntasRespostas(newPerguntasRespostas);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      Alert.alert('Logout realizado com sucesso.');
    }).catch((error) => {
      Alert.alert('Erro ao sair: ' + error.message);
    });
  };

  const abrirFormularioEdicao = (key, registro) => {
    setEditKey(key);
    setEditRegistro({ ...registro });
    setEditModalVisible(true);
  };

  const salvarAlteracoes = () => {
    if (editRegistro.perguntasRespostas.some(pr => !pr.pergunta || !pr.resposta)) {
      Alert.alert("Por favor, preencha todas as perguntas e respostas.");
      return;
    }
    const userId = user.uid;
    const registroRef = ref(db, `users/${userId}/registros/${editKey}`);
    set(registroRef, editRegistro).then(() => {
      Alert.alert('Alterações salvas com sucesso!');
      setEditModalVisible(false);
    }).catch((error) => {
      Alert.alert('Erro ao salvar alterações: ' + error.message);
    });
  };

  const excluirRegistro = (key) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => confirmarExclusao(key)
        }
      ]
    );
  };

  const confirmarExclusao = (key) => {
    const userId = user.uid;
    const registroRef = ref(db, `users/${userId}/registros/${key}`);
    remove(registroRef).then(() => {
      Alert.alert('Registro excluído com sucesso!');
    }).catch((error) => {
      Alert.alert('Erro ao excluir registro: ' + error.message);
    });
  };

  const iniciarEstudo = (registro) => {
    setEstudarRegistro(registro);
    setCurrentPerguntaIndex(0);
    setEstudarModalVisible(true);
  };

  const proximaPergunta = () => {
    if (currentPerguntaIndex < (estudarRegistro?.perguntasRespostas.length - 1)) {
      setCurrentPerguntaIndex(currentPerguntaIndex + 1);
    } else {
      Alert.alert('Você completou todas as perguntas!');
      setEstudarModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>

          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.header}>Ambiente de Estudos</Text>
            <Text style={styles.textoh2}> Criar Card </Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#fff"
              value={nome}
              onChangeText={setNome}
            />
            {perguntasRespostas.map((pr, index) => (
              <View key={index} style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite a pergunta"
                  placeholderTextColor="#fff"
                  value={pr.pergunta}
                  onChangeText={value => handlePerguntaRespostaChange(index, 'pergunta', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Digite a resposta"
                  placeholderTextColor="#fff"
                  value={pr.resposta}
                  onChangeText={value => handlePerguntaRespostaChange(index, 'resposta', value)}
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={adicionarCampoPerguntaResposta}
              >
                <Text style={styles.buttonText}>Adicionar Pergunta/Resposta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 10, marginBottom: 35 }]} // Adiciona margem acima do botão
                onPress={adicionarPerguntaResposta}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white', marginBottom: 25 }} />
                <View>
                  <Text style={{ width: 50, textAlign: 'center', color: 'white', fontSize: 18, marginBottom: 25 }}>Cards</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white', marginBottom: 25 }} />
              </View>
            </View>
            {registros.map(([key, registro]) => (
              <View key={key} style={styles.card}>
                <Text style={styles.cardHeader}>{registro.nome}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => iniciarEstudo(registro)}>
                  <Text style={styles.buttonText}>Estudar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => abrirFormularioEdicao(key, registro)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => excluirRegistro(key)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))}

            <Modal visible={editModalVisible} animationType="slide">
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input2}
                  placeholder="Nome"
                  value={editRegistro?.nome || ''}
                  onChangeText={value => setEditRegistro({ ...editRegistro, nome: value })}
                />
                {editRegistro?.perguntasRespostas.map((pr, index) => (
                  <View key={index} style={styles.inputGroup}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite a pergunta"
                      value={pr.pergunta}
                      onChangeText={value => {
                        const newPRs = [...editRegistro.perguntasRespostas];
                        newPRs[index].pergunta = value;
                        setEditRegistro({ ...editRegistro, perguntasRespostas: newPRs });
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Digite a resposta"
                      value={pr.resposta}
                      onChangeText={value => {
                        const newPRs = [...editRegistro.perguntasRespostas];
                        newPRs[index].resposta = value;
                        setEditRegistro({ ...editRegistro, perguntasRespostas: newPRs });
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={salvarAlteracoes}>
                  <Text style={styles.buttonText}> Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.buttonText}> Fechar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal visible={estudarModalVisible} animationType="slide">
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Pergunta:</Text>
                <Text style={{ color: 'white', marginBottom: 10, }}> {estudarRegistro?.perguntasRespostas[currentPerguntaIndex]?.pergunta}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => Alert.alert('Resposta', estudarRegistro?.perguntasRespostas[currentPerguntaIndex]?.resposta)}>
                  <Text style={styles.buttonText}> Mostrar Resposta</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={proximaPergunta}>
                  <Text style={styles.buttonText}> Próxima Pergunta</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => setEstudarModalVisible(false)}>
                  <Text style={styles.buttonText}> Fechar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ScrollView>
        </>
      ) : (
        <Text style={styles.header}>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f1f21',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
    color: '#fff',
  },
  textoh2: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  placeholder: {
    color: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 40,
    borderRadius: 8,
    elevation: 2, // Sombra para efeito de profundidade (Android)
    shadowColor: '#000', // Sombra para efeito de profundidade (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  cardHeader: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',

  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f1f21',
    color: '#fff',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    // backgroundColor: '#1f1f21',
    color: '#fff',
    marginTop: 300,
  },
  buttonContainer: {
    marginTop: -5,

  },
  button: {
    backgroundColor: '#0170f3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonModal: {
    marginBottom: 50,
  },
});

export default Ambiente;