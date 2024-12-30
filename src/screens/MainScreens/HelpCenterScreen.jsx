import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity 
      style={styles.faqItem} 
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
      </View>
      {expanded && (
        <Text style={styles.answer}>{answer}</Text>
      )}
    </TouchableOpacity>
  );
};

const HelpCenterScreen = () => {
  const faqs = [
    {
      question: "How do I create an event?",
      answer: "To create an event, tap the '+' button on the home screen and follow the steps to fill in your event details."
    },
    {
      question: "How do I edit my profile?",
      answer: "Go to Profile > Edit Profile to update your personal information and profile picture."
    },
    // Add more FAQs as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help Center</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#9E9E9E',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  faqContainer: {
    backgroundColor: '#2A2630',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  faqItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  expandIcon: {
    color: '#8B7FFF',
    fontSize: 24,
    marginLeft: 8,
  },
  answer: {
    color: '#9E9E9E',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});

export default HelpCenterScreen; 