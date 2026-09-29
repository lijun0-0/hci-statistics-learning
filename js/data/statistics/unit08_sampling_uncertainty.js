const Unit08SamplingUncertainty = {
  unitTitle: "Unit 8: From Samples to Confidence Intervals",
  pages: [
    {
      title: "One sample can estimate the population",
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
                  text: "We want to know the average task time for all HCI students, but we only tested a small sample."
                },
                {
                  speaker: "Student",
                  side: "right",
                  text: "So we cannot see the true population mean directly. We need to <strong>estimate</strong> it from the sample."
                },
                {
                  speaker: "Teacher",
                  side: "left",
                  text: "Exactly. The sample mean gives us one best guess for the population mean."
                }
              ]
            }
          ],
          right: [
            {
              type: "image",
              src: "assets/image/9-1-1.jpg",
              alt: "Population and sample nested-circle diagram",
              caption: "The sample is a small part of the population."
            }
          ]
        },
        {
          type: "infoBox",
          text: "The population mean <strong>μ</strong> is usually unknown. The sample mean <strong>x̄</strong> is what we can calculate. So <strong>x̄</strong> is a <strong>point estimate</strong> of <strong>μ</strong>."
        }
      ]
    },
    {
      title: "Point estimate or interval estimate?",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-2-1.jpg",
          alt: "Question and answer scene about estimates",
          caption: "A very wide range may be safe, but not useful."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Point estimate",
              text: "A point estimate gives <strong>one best guess</strong>. For example, if a sample has an average height of 175 cm, we may use <strong>x̄ = 175</strong> to estimate the population mean <strong>μ</strong>."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Interval estimate",
              text: "An interval estimate provides a <strong>range of plausible values</strong> for the true population value. It is more informative because it reveals the uncertainty around the estimate, not just one number."
            }
          ]
        },
        {
          type: "infoBox",
          text: "An interval like <strong>0-300 cm</strong> is extremely wide. It may be hard to be wrong, but it is not useful. <br><br>A good estimate should be <strong>reasonably reliable</strong> and <strong>reasonably narrow</strong>."
        }
      ]
    },
    {
      title: "Reading a normal distribution",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-3-1.jpg",
          alt: "Annotated normal distribution diagram",
          caption: "Area under the curve represents probability."
        },
        {
          type: "summary",
          items: [
            "The <strong>x-axis</strong> shows possible observed values.",
            "The highest point of the curve is around the <strong>mean</strong>.",
            "The <strong>y-axis</strong> shows probability density, not probability itself.",
            "Probability is shown by the <strong>area under the curve</strong>.",
            "The total area under the curve is <strong>1</strong>, which means 100% of the probability."
          ]
        },
        {
          type: "infoBox",
          text: "For a continuous distribution, we do not usually talk about the probability of one exact value. We look at the probability of an <strong>interval</strong>.<br/>For example, the shaded area in the graph represents the probability that an observed value falls within this range."
        }
      ]
    },
    {
      title: "Mean moves the curve. SD changes the spread.",
      blocks: [
        {
          type: "text",
          text: "In a normal distribution, the <strong>mean</strong> controls the centre of the curve, and the <strong>standard deviation</strong> controls how wide or narrow the curve becomes. Try changing both values below."
        },
        {
          type: "normalCurvePlayground",
          minX: 40,
          maxX: 160,
          defaultMean: 100,
          defaultSD: 15,
          meanRange: [60, 140],
          sdRange: [5, 30],
          xLabel: "Observed value"
        },
        {
          type: "infoBox",
          text: "A <strong>small SD</strong> makes the curve taller and narrower. A <strong>large SD</strong> makes the curve shorter and wider."
        }
      ]
    },
    {
      title: "From raw scores to z-scores",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-5-1.jpg",
          alt: "Normal distribution and standard normal distribution side by side",
          caption: "Standardisation changes the scale but keeps the relative position."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "z-score",
              text: "A <strong>z-score</strong> tells us how many standard deviations a value is above or below the mean. It keeps the <strong>position</strong> of the value, but changes the scale."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Standard normal distribution",
              text: "After standardisation, the distribution has mean <strong>0</strong> and standard deviation <strong>1</strong>. We call this the <strong>standard normal distribution</strong>, or <strong>N(0,1)</strong>."
            }
          ]
        },
        {
          type: "infoBox",
          text: "Around the mean, about <strong>34.13%</strong> of the area lies between 0 and +1 SD on one side,<br><br><strong>13.59%</strong> lies between +1 and +2 SD, and <br><br><strong>2.14%</strong> lies between +2 and +3 SD. The same pattern appears on the left side too."
        }
      ]
    },
    {
     title: "Different samples, different means",
     blocks: [
      {
        type: "text",
        text: "Imagine this is the height distribution of a population. The population follows a normal curve, and its centre is the true population mean <strong>μ = 170 cm</strong>."
      },
      {
        type: "samplingPlayground",
        mode: "sampleVariability",
        title: "Take samples from the same population",
        sampleSize: 10,
        maxSamples: 10,
        valueSuffix: "cm",
        populationImageSrc: "assets/image/9-6-1.jpg",
        populationImageAlt: "Hand-drawn normal distribution of population height",
        populationDescription: "Suppose this is the population distribution of height. It follows a normal curve, and the centre is the true population mean μ = 170 cm.",
        populationValues: [150,155,158,160,161,162,163,164,165,165,166,166,167,167,168,168,168,169,169,169,169,170,170,170,170,170,170,170,171,171,171,171,172,172,172,173,173,174,174,175,175,176,177,178,179,180,182,185,190,192]
      },
      {
        type: "infoBox",
        text: "The sample mean changes from sample to sample. This is called <strong>sampling variability</strong>."
      }
    ]
    },
    {
      title: "CLT and standard error",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-8-1.jpg",
          alt: "Four-panel comic about repeated sampling, CLT, and standard error",
          caption: "Repeated sampling leads to the sampling distribution of the mean."
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Central Limit Theorem (CLT)",
              text: "When the sample size is large enough, the distribution of sample means often becomes <strong>approximately normal</strong>, even if the raw data are not perfectly normal."
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Standard error (SE)",
              text: "The <strong>standard error</strong> is a special kind of standard deviation. It describes how much <strong>sample means</strong> vary from sample to sample.<br><br>More precisely, SE is the standard deviation of the sampling distribution of the mean.<br><br><span class='formula-line'><strong>SE = </strong><span class='math-fraction'><span class='math-top'>σ</span><span class='math-bar'></span><span class='math-bottom'>√n</span></span></span><br><br>In practice, we often estimate it with <span class='formula-line'><strong>SE ≈ </strong><span class='math-fraction'><span class='math-top'>s</span><span class='math-bar'></span><span class='math-bottom'>√n</span></span></span>."
            }
          ]
        },
        {
          type: "reveal",
          prompt: "Quick check: if the sample size gets larger, what usually happens to the standard error?",
          hiddenAnswer: "It usually gets smaller. A larger sample size makes the sample mean more stable, so the sampling distribution becomes narrower."
        }
      ]
    },
    {
      title: "From sampling range to confidence interval",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-8-2.jpg",
          alt: "Sampling distribution with middle 95 percent range around the true population mean",
          caption: "Theoretical view: if we know μ, about 95% of sample means fall near μ."
        },
        {
          type: "conceptBox",
          title: "Theoretical view: predicting sample means",
          text: "Imagine we know the true population mean <strong>μ</strong>. If we repeatedly take samples, about <strong>95%</strong> of the sample means <strong>x̄</strong> will fall within this range:<br><br><strong>μ ± 1.96 × SE</strong><br><br>Here, the centre is the true value <strong>μ</strong>. This view predicts where sample means are likely to appear."
        },
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "right",
              text: "But in real research, we do not know the true population mean μ."
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "Exactly. We usually only have one sample mean x̄. So we reverse the idea and use x̄ to estimate where μ might be."
            }
          ]
        },
        {
          type: "image",
          src: "assets/image/9-8-3.jpg",
          alt: "Confidence interval centred on the sample mean",
          caption: "Real research view: start from x̄ and build a range that may contain μ."
        },
        {
          type: "conceptBox",
          title: "Confidence interval",
          text: "In real research, we usually only have <strong>one sample</strong>. We know the sample mean <strong>x̄</strong>, but we do not know the true population mean <strong>μ</strong>.<br><br>So we build an interval around <strong>x̄</strong>:<br><br><strong>95% CI = x̄ ± 1.96 × SE</strong><br><br>This interval is our estimate of where the true population mean <strong>μ</strong> may be."
        },
        {
          type: "infoBox",
          text: "The key change is the centre. In the theoretical sampling distribution, the centre is <strong>μ</strong>. In a confidence interval, the centre is the sample mean <strong>x̄</strong>, because that is what we actually observe."
        }
      ]
    },
    {
      title: "Why 1.96 and 2.58?",
      blocks: [
        {
          type: "image",
          src: "assets/image/9-9-1.jpg",
          alt: "Normal distribution showing the cut points 1.96 and 2.58",
          caption: "The two cut points mark the middle area of the normal distribution."
        },
        {
          type: "infoBox",
          text: "For a <strong>two-sided</strong> confidence interval, we focus on the central region of the normal distribution. <br/>A 95% confidence interval covers the middle 95% of the distribution. This leaves 2.5% of the area in each tail. <br/>The boundary values for this region are the z-scores <strong>−1.96</strong> and <strong>+1.96</strong>."
        },
        {
          type: "simpleTable",
          title: "Common z cut points",
          headers: ["Confidence level", "Middle area", "Left tail", "Right tail", "z cut points"],
          rows: [
            ["95%", "0.95", "0.025", "0.025", "−1.96 and +1.96"],
            ["99%", "0.99", "0.005", "0.005", "−2.58 and +2.58"]
          ]
        },
        {
          type: "conceptBox",
          title: "Important idea",
          text: "The value <strong>1.96</strong> is not random. It comes from the <strong>standard normal distribution</strong>. It tells us where the middle 95% area ends."
        },
        {
          type: "conceptBox",
          title: "Stringency of 95% vs 99% Confidence Levels",
          text:"<strong>95% confidence level:</strong> It allows a 5% probability of extreme sampling errors. The confidence interval is narrower, leading to more precise estimations.<br><br><strong>99% confidence level:</strong> It follows stricter criteria, permitting only a 1% chance of extreme cases. The critical value rises, widening the confidence interval and resulting in a broader estimation range."
        }
      ]
    },
    {
      title: "Quick check: build a 95% confidence interval",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Teacher",
              side: "left",
              text: "Now let’s build a confidence interval from a sample."
            },
            {
              speaker: "Student",
              side: "right",
              text: "So we start from the sample mean, then add and subtract a margin of error?"
            }
          ]
        },
        {
          type: "conceptBox",
          title: "Question",
          text: "A population has standard deviation <strong>σ = 7</strong>. A sample has <strong>n = 9</strong>. The sample mean is <strong>x̄ = 78</strong>.<br><br>What is the <strong>95% confidence interval</strong> for the population mean <strong>μ</strong>?"
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Step 1: Find the standard error",
              text: "<span class='formula-line'><strong>SE = </strong><span class='math-fraction'><span class='math-top'>σ</span><span class='math-bar'></span><span class='math-bottom'>√n</span></span></span><br><br><span class='formula-line'><strong>SE = </strong><span class='math-fraction'><span class='math-top'>7</span><span class='math-bar'></span><span class='math-bottom'>√9</span></span> = <span class='math-fraction'><span class='math-top'>7</span><span class='math-bar'></span><span class='math-bottom'>3</span></span> = 2.33</span>"
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Step 2: Build the interval",
              text: "<strong>95% CI = x̄ ± 1.96 × SE</strong><br><br><strong>95% CI = 78 ± 1.96 × 2.33</strong><br><br><strong>95% CI = 78 ± 4.57</strong>"
            }
          ]
        },
        {
          type: "infoBox",
          text: "So the 95% confidence interval is approximately <strong>[73.43, 82.57]</strong>. This gives a plausible range for the population mean <strong>μ</strong>."
        },
        {
          type: "reveal",
          prompt: "Why does the interval use 1.96 here?",
          hiddenAnswer: "Because this is a two-sided 95% confidence interval based on the standard normal distribution. The middle 95% area is between about -1.96 and +1.96."
        }
      ]
    },
    {
      title: "From confidence to decision",
      blocks: [
        {
          type: "dialogue",
          lines: [
            {
              speaker: "Student",
              side: "right",
              text: "So 95% confidence means we leave 5% outside the middle area?"
            },
            {
              speaker: "Teacher",
              side: "left",
              text: "Yes. That outside part is connected to α, which we will use again in hypothesis testing."
            }
          ]
        },
        {
          type: "splitLayout",
          left: [
            {
              type: "conceptBox",
              title: "Confidence level",
              text: "<strong>95% confidence level</strong> means the method aims to capture the true population parameter in about 95% of repeated samples.<br><br><strong>Confidence level = 1 − α</strong>"
            }
          ],
          right: [
            {
              type: "conceptBox",
              title: "Significance level α",
              text: "If the confidence level is <strong>95%</strong>, then:<br><br><strong>α = 1 − 0.95 = 0.05</strong><br><br>This 5% is the area left outside the middle 95%."
            }
          ]
        },
        {
          type: "simpleTable",
          title: "Confidence level and α",
          headers: ["Confidence level", "α", "Two-sided tails"],
          rows: [
            ["90%", "0.10", "0.05 + 0.05"],
            ["95%", "0.05", "0.025 + 0.025"],
            ["99%", "0.01", "0.005 + 0.005"]
          ]
        },
        {
          type: "infoBox",
          text: "In this unit, α appears as the area outside a confidence interval. <br/>In the next unit, α becomes a <strong>decision threshold</strong>: should we reject the null hypothesis or not?"
        },
        {
          type: "summary",
          items: [
            "A sample mean is a point estimate of a population mean.",
            "Different samples can give different sample means.",
            "The sampling distribution shows how sample means vary.",
            "Standard error describes the spread of sample means.",
            "A 95% confidence interval is often built as x̄ ± 1.96 × SE.",
            "α connects confidence intervals to hypothesis testing."
          ]
        }
      ]
    }
  ]
};