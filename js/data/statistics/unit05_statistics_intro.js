const unit05StatisticsIntro = {
  id: "unit05_statistics_intro",
  unitTitle: "Unit 5: Statistics Intro",

  pages: [
    {
      title: "After the study, what do we have?",
      blocks: [
        {
          type: "text",
          text: "During the experiment, we record their task time, errors, and satisfaction rating."
        },
        {
          type: "image",
          src: "assets/image/5-1-1.jpg",
          alt: "A researcher holds a data sheet while four participants take part in a study."
        },
        {
          type: "simpleTable",
          headers: [
            "Participant",
            "Gender",
            "Interface",
            "Task time",
            "Errors",
            "Satisfaction"
          ],
          rows: [
            ["P01", "Female", "A", "32s", "1", "4"],
            ["P02", "Male", "B", "28s", "0", "5"],
            ["P03", "Female", "A", "41s", "2", "3"],
            ["P04", "Male", "B", "30s", "1", "4"]
          ]
        },
        {
          type: "conceptBox",
          title: "Raw data",
          text: "<span class='key-line'>Statistics starts from raw data.</span><br>Raw data are the original values collected from a study, before we summarise or analyse them."
        }
      ]
    },

    {
      title: "Different variables need different statistics",
      blocks: [
        {
          type: "text",
          text: "Look at the same raw data table again. Different columns contain different kinds of information."
        },
        {
          type: "simpleTable",
          headers: [
            "Participant",
            "Gender",
            "Interface",
            "Task time",
            "Errors",
            "Satisfaction"
          ],
          rows: [
            ["P01", "Female", "A", "32s", "1", "4"],
            ["P02", "Male", "B", "28s", "0", "5"],
            ["P03", "Female", "A", "41s", "2", "3"],
            ["P04", "Male", "B", "30s", "1", "4"]
          ]
        },
        {
          type: "infoBox",
          text: "Can we calculate the mean of <strong>gender</strong>?<br><br>Can we rank <strong>Interface A and Interface B</strong>?<br><br>P02 has <strong>0 errors</strong>. Does 0 mean no errors?<br><br>If the temperature is <strong>0°C</strong>, does it mean there is no temperature?"
        },
        {
          type: "reveal",
          prompt: "What do these questions tell us?",
          hiddenAnswer: "Different variables need different statistics. Not all data can be analysed in the same way.",
          required: true
        }
      ]
    },

    {
      title: "Four common data types",
      blocks: [
        {
          type: "conceptBox",
          title: "Nominal data",
          text: "Nominal data are categories with no natural order.<br><span class='key-line'>Example: gender, interface A/B, device type.</span>"
        },
        {
          type: "conceptBox",
          title: "Ordinal data",
          text: "Ordinal data have an order, but the distance between values may not be equal.<br><span class='key-line'>Example: satisfaction rating from 1 to 5, preference ranking.</span>"
        },
        {
          type: "conceptBox",
          title: "Interval data",
          text: "Interval data have equal distances between values, but zero does not mean nothing.<br><span class='key-line'>Example: temperature in °C.</span>"
        },
        {
          type: "conceptBox",
          title: "Ratio data",
          text: "Ratio data have equal distances and a true zero.<br><span class='key-line'>Example: task time, number of errors, number of clicks.</span>"
        },
        {
          type: "dataTypeDrag",
          instruction: "Drag each variable to the correct data type.",
          variables: [
            {
              label: "Interface A/B",
              answer: "nominal"
            },
            {
              label: "Satisfaction 1–5",
              answer: "ordinal"
            },
            {
              label: "Task time",
              answer: "ratio"
            },
            {
              label: "Number of errors",
              answer: "ratio"
            }
          ],
          categories: [
            {
              id: "nominal",
              title: "Nominal"
            },
            {
              id: "ordinal",
              title: "Ordinal"
            },
            {
              id: "interval",
              title: "Interval"
            },
            {
              id: "ratio",
              title: "Ratio"
            }
          ]
        }
      ]
    },

    {
      title: "Who do the data represent?",
      blocks: [
        {
          type: "text",
          text: "A small HCI study usually collects data from a sample, but the researcher often wants to understand a larger group."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "image",
              src: "assets/image/5-1-2.jpg",
              alt: "A visual diagram showing the relationship between population, sample, and individuals."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Population",
              text: "The population is the larger group we want to understand."
            },
            {
              type: "conceptBox",
              title: "Sample",
              text: "The sample is the smaller group we actually collect data from."
            },
            {
              type: "conceptBox",
              title: "Individual",
              text: "An individual is one person or unit in the study. In this example, P01 is one individual."
            }
          ]
        },
        {
          type: "infoBox",
          text: "Statistics helps us use the sample to say something careful about the population."
        }
      ]
    },

    {
      title: "Parameter or statistic?",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Teacher",
              side: "left",
              text: "If we want to use a mathematical symbol for the mean task time, what should we write?"
            },
            {
              speaker: "Student",
              side: "right",
              text: "I know. We should use x̄."
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "Think again. Are we talking about the whole population, or only the sample?"
            }
          ]
        },
        {
          type: "quiz",
          question: "Can we use the same symbol for the population mean and the sample mean?",
          options: [
            "Yes, because they are both means.",
            "No, because the population value and the sample value are different ideas.",
            "Yes, because the sample is always exactly the same as the population."
          ],
          correctAnswer: 1,
          feedback: "Correct. The population value is usually unknown. The sample value is calculated from the data we collected.",
          required: true,
          unlocks: [
            "parameter-explanation",
            "symbol-table"
          ]
        },
        {
          type: "conceptBox",
          blockId: "parameter-explanation",
          initiallyHidden: true,
          title: "Parameter vs statistic",
          text: "A <strong>parameter</strong> describes the population. It is often unknown.<br><br>A <strong>statistic</strong> is calculated from the sample. It is based on the data we actually collected.<br><span class='key-line'>Population = usually unknown<br>Sample = known data</span>"
        },
        {
          type: "simpleTable",
          blockId: "symbol-table",
          initiallyHidden: true,
          tableClass: "symbol-table-wrapper",
          title: "Common symbols",
          headers: [
            "What we describe",
            "Population parameter",
            "Sample statistic",
            "HCI example"
          ],
          rows: [
            [
              "Size",
              "N",
              "n",
              "All target users vs 20 participants"
            ],
            [
              "Mean",
              "μ",
              "x̄",
              "Average task time"
            ],
            [
              "Variance",
              "σ²",
              "s²",
              "Spread of task times"
            ],
            [
              "Standard deviation",
              "σ",
              "s",
              "Typical spread around the mean"
            ],
            [
              "Correlation",
              "ρ",
              "r",
              "Screen size and task time"
            ],
          ]
        }
      ]
    }
  ]
};
