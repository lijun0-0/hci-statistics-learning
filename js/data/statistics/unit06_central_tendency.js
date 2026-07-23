const unit06CentralTendency = {
  id: "unit06_central_tendency",
  unitTitle: "Unit 6: Central Tendency",

  pages: [
    {
      title: "Can one number represent the group?",
      blocks: [
        {
          type: "splitLayout",
          left: [
            {
              type: "dialogue",
              lines: [
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "We tested how long students need to find a classroom. Can we use one number to describe the group?"
                },
                {
                  speaker: "Student",
                  side: "right",
                  text: "Maybe the average time?"
                },
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "Good idea. But is the average always safe?"
                }
              ]
            }            
          ],
          right: [
            {
              type: "simpleTable",
              title: "Simulated task time data",
              headers: ["Participant", "Task time"],
              rows: [
                ["P01", "24s"],
                ["P02", "26s"],
                ["P03", "27s"],
                ["P04", "28s"],
                ["P05", "30s"],
                ["P06", "31s"],
                ["P07", "32s"]
              ]
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Central tendency",
          text: "A central tendency measure tries to describe the centre of a dataset.<br><span class='key-line'>Mean, Median, and Mode are three common choices.</span>"
        },
        {
          type: "infoBox",
          text: "In HCI, we often use one number to summarise many users. But one number can hide important details."
        }
      ]
    },

    {
      title: "Mean, Median, and Mode",
      blocks: [
        {
          type: "text",
          text: "Here are three simple ways to find the centre of a dataset."
        },
        {
          type: "simpleTable",
          title: "Three centre measures",
          headers: ["Measure", "Simple idea", "Example result"],
          rows: [
            ["Mean", "Add all values, then divide by the number of values.", "(24 + 26 + 27 + 28 + 30 + 31 + 32) / 7 = 28.3"],
            ["Median", "Sort the values, then find the middle value.", "28"],
            ["Mode", "Find the most frequent value.", "No clear mode here"]
          ]
        },
        {
          type: "simpleTable",
          title: "Useful symbols",
          headers: ["Measure", "Sample symbol", "Simple formula"],
          rows: [
            ["Mean", "x̄", "Σx / n"],
            ["Median", "Mdn", "middle value"],
            ["Mode", "Mo", "most frequent value"]
          ]
        },
        {
          type: "conceptBox",
          title: "Important point",
          text: "The mean, median, and mode can be close to each other. But when the data shape changes, they can tell different stories."
        }
      ]
    },

    {
      title: "Move the data, move the centre",
      blocks: [
        {
          type: "text",
          text: "Change the values, remove some values, or choose a preset distribution. Watch how the centre changes."
        },
        {
          type: "distributionPlayground",
          instruction: "Click a value to include or skip it. Edit a number to change the data.",
          defaultPreset: "normal",
          presets: [
            {
              id: "normal",
              label: "Normal-ish",
              data: [20, 23, 24, 25, 25, 26, 27, 27, 28, 28, 28, 29, 29, 30, 31, 31, 32, 33, 35, 38]
            },
            {
              id: "rightSkew",
              label: "Right skew",
              data: [20, 22, 23, 24, 24, 25, 26, 27, 28, 29, 32, 36, 43, 58, 80]
            },
            {
              id: "leftSkew",
              label: "Left skew",
              data: [10, 18, 35, 42, 46, 49, 51, 52, 53, 54, 55, 56, 56, 57, 58]
            },
            {
              id: "bimodal",
              label: "Bimodal",
              data: [20, 21, 22, 23, 24, 25, 38, 39, 40, 41, 42, 43]
            },
            {
              id: "outlier",
              label: "With outlier",
              data: [24, 26, 27, 28, 30, 31, 200]
            }
          ],
          showLines: ["mean", "median", "mode"]
        },
        {
          type: "infoBox",
          text: "The mean usually moves more when an extreme value appears. The median often stays more stable."
        }
      ]
    },

    {
      title: "Shape matters",
      blocks: [
        {
          type: "text",
          text: "A dataset has a shape. The shape helps us decide which centre measure is useful."
        },
        {
          type: "image",
          src: "assets/image/6-4-1.jpg",
          alt: "A visual guide showing normal, bimodal, left-skewed, and right-skewed distributions.",
          caption: "Different data shapes can change the relationship between mean, median, and mode."
        },
        {
          type: "simpleTable",
          title: "Common patterns",
          headers: ["Data shape", "Typical relationship", "What it means"],
          rows: [
            ["Symmetric", "mean ≈ median ≈ mode", "One centre can describe the data quite well."],
            ["Right-skewed", "mode < median < mean", "A few large values pull the mean to the right."],
            ["Left-skewed", "mean < median < mode", "A few small values pull the mean to the left."],
            ["Bimodal", "two modes", "One centre may hide two different groups."]
          ]
        },
        {
          type: "conceptBox",
          title: "Bimodal warning",
          text: "If there are two clear peaks, do not only report one centre value. Show the distribution too."
        }
      ]
    },

    {
      title: "One unusual value can change the story",
      blocks: [
        {
          type: "image",
          src: "assets/image/6-5-1.jpg",
          alt: "The birth of an outlier: P07 gets a phone call during the task and their task time becomes 200 seconds.",
          caption: "The birth of an outlier."
        },
        {
          type: "distributionPlayground",
          instruction: "Compare the dataset before and after the interrupted participant is included.",
          defaultPreset: "before",
          presets: [
            {
              id: "before",
              label: "Before outlier",
              data: [24, 26, 27, 28, 30, 31, 32]
            },
            {
              id: "after",
              label: "After outlier",
              data: [24, 26, 27, 28, 30, 31, 200]
            }
          ],
          showLines: ["mean", "median", "mode"]
        },
        {
          type: "conceptBox",
          title: "Outlier",
          text: "An outlier is a value that is very different from the rest of the data.<br><span class='key-line'>The mean is sensitive to outliers. The median is more robust.</span>"
        },
        {
          type: "infoBox",
          text: "Outliers are not always mistakes. Sometimes they are real but unusual cases. <br/>In HCI, we should explain why we keep or remove them."
        }
      ]
    },

    {
      title: "Which centre should we report?",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "So should I always use the mean?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Not always. Choose the centre measure that matches the data."
            }
          ]
        },
        {
          type: "simpleTable",
          title: "A simple decision guide",
          headers: ["Situation", "Better choice", "HCI example"],
          rows: [
            ["Numerical data, roughly balanced", "Mean", "Average task time when there is no strong outlier"],
            ["Skewed data or clear outlier", "Median", "Task time when one user was interrupted"],
            ["Category data", "Mode", "Most preferred interface: A, B, or C"],
            ["Two clear groups", "Show distribution", "Novice and expert users behave differently"]
          ]
        },
        {
          type: "infoBox",
          text: "A good report can include both a centre value and a visual distribution. This helps readers see the full story."
        }
      ]
    },

    {
      title: "Quick check",
      blocks: [
        {
          type: "reveal",
          prompt: "Data: 2, 3, 3, 4, 100. Which centre is most affected by 100?",
          hiddenAnswer: "The mean. The value 100 pulls the mean upward."
        },
        {
          type: "reveal",
          prompt: "Data: A, A, B, C, A. Which centre can describe this data?",
          hiddenAnswer: "The mode. The mode is A because A appears most often. Mean and median do not make sense for these categories."
        },
        {
          type: "reveal",
          prompt: "A dataset has two peaks. Should we only report the mean?",
          hiddenAnswer: "No. The mean may hide the two groups. We should show the distribution too."
        },
        {
          type: "summary",
          items: [
            "Mean is useful, but it is sensitive to outliers.",
            "Median is useful when data are skewed or have outliers.",
            "Mode is useful for the most common value or category.",
            "Data shape matters. Always look at the distribution."
          ]
        }
      ]
    }
  ]
};