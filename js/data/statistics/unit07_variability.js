const unit07Variability = {
  id: "unit07_variability",
  unitTitle: "Unit 7: Variability, Standard Deviation, and z-scores",

  pages: [
    {
      title: "Same mean, different spread",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Teacher",
              side: "left",
              text: "Interface A and Interface B both have an average task time of 30 seconds."
            },
            {
              speaker: "Student",
              side: "right",
              text: "So they are equally good?"
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "Not necessarily. We also need to look at the spread of the data."
            }
          ]
        },
        {
          type: "numberLineComparison",
          leftTitle: "Interface A",
          leftCaption: "Most students finish at a similar time.",
          leftValues: [28, 29, 30, 30, 31, 32],

          rightTitle: "Interface B",
          rightCaption: "Some students are fast, but others take much longer.",
          rightValues: [10, 18, 30, 32, 45, 55],

          min: 0,
          max: 60,
          valueSuffix: "s",
          showMean: true,
          summaryItems: ["mean", "range", "sd"]
        },
        {
          type: "conceptBox",
          title: "Spread / variability",
          text: "The mean tells us where the centre is. <strong>Variability</strong> tells us how close together or far apart the values are.<br><span class='key-line'>Small spread = more consistent performance<br>Large spread = less consistent performance</span>"
        }
      ]
    },

    {
      title: "Range: the fastest spread measure",
      blocks: [
        {
          type: "text",
          text: "Task times on a number line"
        },
        {
          type: "image",
          src: "assets/image/7-2-1.jpg",
          alt: "Task times from 10 to 55 seconds shown on a number line, illustrating a range of 45 seconds."
        },
        {
          type: "text",
          text: "Range = maximum value − minimum value = 55s − 10s = 45s"
        },
        {
          type: "conceptBox",
          title: "Range",
          text: "The <strong>range</strong> is the simplest way to describe spread.<br><span class='key-line'>Range = max − min</span>"
        },
        {
          type: "infoBox",
          text: "Range is easy to understand, but it only uses two values: the lowest and the highest."
        }
      ]
    },

    {
      title: "Range can be too sensitive",
      blocks: [
        {
          type: "image",
          src: "assets/image/7-3-1.jpg",
          alt: "One participant got lost in the building."
        },
        {
          type: "simpleTable",
          headers: ["Situation", "Values", "Range"],
          rows: [
            ["Before", "24, 26, 27, 28, 30, 31, 32", "32 − 24 = 8s"],
            ["After one participant got lost", "24, 26, 27, 28, 30, 31, 200", "200 − 24 = 176s"]
          ]
        },
        {
          type: "conceptBox",
          title: "A problem with range",
          text: "A single extreme value can change the range a lot. This means the range may describe the most unusual case, not the typical spread."
        }
      ]
    },

    {
      title: "Ignore the extremes: percentile range",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "If a few extreme values change the range too much, what can we do?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "One idea is to ignore a small proportion of the lowest and highest values."
            }
          ]
        },
        {
          type: "text",
          text: "For example, if most scores are between 60 and 80, but a few students got 0, 99, or 100, we may want to focus on the middle part of the data."
        },
        {
          type: "image",
          src: "assets/image/7-4-1.jpg",
          alt: "A visual explanation of removing the lowest 10 percent and the highest 10 percent of values."
        },
        {
          type: "conceptBox",
          title: "Percentile range",
          text: "The percentile range compares two percentile values.<br><span class='key-line'>Percentile range = P90 − P10</span><br>It tells us how wide the middle 80% of the data are."
        },
        {
          type: "infoBox",
          text: "Compared with the range, the percentile range is less affected by a few extreme values."
        }
      ]
    },

    {
      title: "Deviation: distance from the mean",
      blocks: [
        {
          type: "deviationDemo",
          title: "Distance from the mean",
          text: "A deviation tells us how far one value is from the mean.",
          values: [24, 26, 28, 30, 32],
          meanValue: 28,
          min: 22,
          max: 34,
          valueSuffix: "s"
        },
        {
          type: "conceptBox",
          title: "Deviation",
          text: "The deviation of one value is:<br><span class='key-line'>xᵢ − x̄</span><br>A negative value means it is below the mean. A positive value means it is above the mean."
        }
      ]
    },

    {
      title: "Average deviation (AD)",
      blocks: [
        {
          type: "deviationDemo",
          title: "Average distance from the mean",
          text: "If we want one number to describe overall spread, we can average the distances from the mean.",
          values: [24, 26, 28, 30, 32],
          meanValue: 28,
          min: 22,
          max: 34,
          valueSuffix: "s",
          showAbsolute: true,
          showAverageAbsolute: true
        },
        {
          type: "conceptBox",
          title: "Average deviation",
          text: "Average deviation (AD) uses the absolute value of each deviation, so positive and negative distances do not cancel each other out.<br><br><span class='key-line'>AD = Σ|xᵢ − x̄| / n</span>"
        },
        {
          type: "infoBox",
          text: "AD is intuitive because it means the average distance from the mean. But absolute values are not always convenient for later mathematical operations."
        }
      ]
    },

    {
      title: "From deviation to variance and standard deviation",
      blocks: [
        {
          type: "text",
          text: "Instead of using absolute values, statistics often uses squared deviations."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "Average deviation is easy to understand. It means the average distance from the mean. Why do we need another measure?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Good question. AD uses absolute values, like |xᵢ − x̄|. This works well for intuition, but absolute values are not very convenient for later statistical formulas."
            },
            {
              speaker: "Student",
              side: "left",
              text: "So statistics uses another way to stop positive and negative deviations from cancelling out?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Exactly. Instead of taking the absolute value, we square each deviation: (xᵢ − x̄)². Squaring also makes every distance positive."
            },
            {
              speaker: "Student",
              side: "left",
              text: "Then we average these squared distances?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Yes. That average squared distance is called variance. But because the unit is squared, such as seconds squared, we take the square root to get standard deviation."
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Variance",
          text: "Variance is the average squared deviation from the mean.<br><span class='key-line'>It describes spread, but the unit is squared.</span>"
        },
        {
          type: "conceptBox",
          title: "Standard deviation",
          text: "Standard deviation (SD) is the square root of the variance.<br><span class='key-line'>This brings us back to the original unit, so SD is easier to interpret.</span>"
        },
        {
          type: "simpleTable",
          tableClass: "unit07-formula-table",
          title: "Sample formulas",
          headers: ["Measure", "Formula", "Meaning"],
          rows: [
            ["Variance", "s² = Σ(xᵢ − x̄)² / (n − 1)", "average squared spread"],
            ["Standard deviation", "s = √(s²)", "typical spread around the mean"]
          ]
        }
      ]
    },

    {
      title: "Standard deviation shows consistency",
      blocks: [
        {
          type: "numberLineComparison",
          leftTitle: "Interface A",
          leftCaption: "Small spread → users have similar experiences.",
          leftValues: [28, 29, 30, 30, 31, 32],

          rightTitle: "Interface B",
          rightCaption: "Large spread → users are much more different from each other.",
          rightValues: [10, 18, 30, 32, 45, 55],

          min: 0,
          max: 60,
          valueSuffix: "s",
          showMean: true,
          summaryItems: ["mean", "sd"]
        },
        {
          type: "infoBox",
          text: "Both interfaces can have the same mean but very different SDs. <br><br>In HCI, a larger SD means user experience is less consistent."
        }
      ]
    },

    {
      title: "Can we compare any two SDs?",
      blocks: [
        {
          type: "image",
          src: "assets/image/7-9-1.jpg",
          alt: "A comic showing London buildings, stick-figure students, and a question mark about standard deviation."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "left",
              text: "The SD of London building heights is 10 cm, and the SD of St Andrews students' height is 5 cm. Does that mean buildings are more spread out?"
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "It might sound that way at first. But think about it: a 10 cm difference between two buildings is barely noticeable, yet a 5 cm difference between two people is really obvious."
            },
            {
              speaker: "Student",
              side: "left",
              text: "Oh right! Raw standard deviation doesn’t work well when we measure things with totally different average sizes."
            },
            {
              speaker: "Teacher",
              side: "right",
              text: "Exactly. To fairly compare relative spread across different scales, we use the coefficient of variation."
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Coefficient of variation (CV)",
          text: "CV compares spread relative to the mean.<br><span class='key-line'>CV = SD / Mean × 100%</span>"
        },
        {
          type: "simpleTable",
          headers: ["HCI example", "Mean", "SD", "CV"],
          rows: [
            ["Short task", "10s", "2s", "20%"],
            ["Long task", "100s", "10s", "10%"]
          ]
        },
        {
          type: "infoBox",
          text: "Although the long task has a larger SD, the short task is relatively more variable because its CV is higher."
        }
      ]
    },

    {
      title: "z-score: where is one score in the group?",
      blocks: [
        {
          type: "image",
          src: "assets/image/7-10-1.jpg",
          alt: "Alice, Bob, and the teacher compare two exam scores and ask who did better compared with their class."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Teacher",
              side: "left",
              text: "Alice got 130 in Literature. Bob got 130 in Maths. Both class means are 100."
            },
            {
              speaker: "Student",
              side: "right",
              text: "They got the same score. So they did equally well?"
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "Not necessarily. We need to see how far each score is from the class mean in SD units."
            }
          ]
        },
        {
          type: "numberLineComparison",
          leftTitle: "Literature",
          leftCaption: "Mean = 100, SD = 10",
          leftValues: [70, 80, 90, 95, 100, 100, 105, 110, 120, 130],
          leftMeanValue: 100,
          leftFocusValue: 130,
          leftFocusLabel: "Alice 130",

          rightTitle: "Maths",
          rightCaption: "Mean = 100, SD = 15",
          rightValues: [55, 70, 85, 95, 100, 100, 110, 120, 130, 145],
          rightMeanValue: 100,
          rightFocusValue: 130,
          rightFocusLabel: "Bob 130",

          min: 50,
          max: 150,
          showMean: true,
          summaryItems: []
        },
        {
          type: "simpleTable",
          headers: ["Student", "Calculation", "z-score", "Interpretation"],
          rows: [
            ["Alice", "(130 − 100) / 10", "3", "3 SDs above the mean"],
            ["Bob", "(130 − 100) / 15", "2", "2 SDs above the mean"]
          ]
        },
        {
          type: "conceptBox",
          title: "z-score",
          text: "The z-score reflects the relative position of an individual data point within the overall data distribution.<br>A z-score tells us how many standard deviations a value is above or below the mean.<br><span class='key-line'>z = (x − x̄) / s</span>"
        }
      ]
    },

    {
      title: "z-score as position",
      blocks: [
        {
          type: "image",
          src: "assets/image/7-11-1.jpg",
          alt: "A simple bell-shaped curve showing positions from -3 SD to +3 SD."
        },
        {
          type: "conceptBox",
          title: "Reading z-scores",
          text: "<strong>z = 0</strong>: around the mean<br><strong>z = +1</strong>: one SD above the mean<br><strong>z = -1</strong>: one SD below the mean<br><strong>z = +3</strong>: far above the mean<br><strong>z = -3</strong>: far below the mean"
        },
        {
          type: "infoBox",
          text: "A positive z-score means the value is above the mean. A negative z-score means it is below the mean."
        }
      ]
    },

    {
      title: "Quick check",
      blocks: [
        {
          type: "conceptBox",
          title: "Question 1",
          text: "Interface A and Interface B both have a mean of 30 seconds. Interface A has a much smaller SD. What does that tell us?"
        },
        {
          type: "reveal",
          prompt: "Click to reveal the answer",
          hiddenAnswer: "Interface A is more consistent. Users perform more similarly with Interface A."
        },
        {
          type: "conceptBox",
          title: "Question 2",
          text: "Why can one extreme value change the range a lot?"
        },
        {
          type: "reveal",
          prompt: "Click to reveal the answer",
          hiddenAnswer: "Because the range only uses the minimum and the maximum values."
        },
        {
          type: "conceptBox",
          title: "Question 3",
          text: "Task A: mean = 10s, SD = 2s. Task B: mean = 100s, SD = 10s. Which task has a larger relative spread?"
        },
        {
          type: "reveal",
          prompt: "Click to reveal the answer",
          hiddenAnswer: "Task A. Its CV is 20%, while Task B's CV is 10%."
        },
        {
          type: "conceptBox",
          title: "Question 4",
          text: "Alice has z = 3 and Bob has z = 2. Who is further above their group mean?"
        },
        {
          type: "reveal",
          prompt: "Click to reveal the answer",
          hiddenAnswer: "Alice. A z-score of 3 means she is 3 standard deviations above the mean."
        }
      ]
    }
  ]
};
