import os
import pandas as pd 
import numpy as np

# ================================
# PATHS
# ================================

# Define input and output paths
path_json = "/Users/elyestabbane/Documents/2-PhD/4-Teaching/programming_online_experiments/01-Fundamentals-Online-Experiments/data_analysis/data/raw"
output_file = "/Users/elyestabbane/Documents/2-PhD/4-Teaching/programming_online_experiments/01-Fundamentals-Online-Experiments/data_analysis/data/processed/aggregated_data_stroop.json"

# Get list of JSON files
file_list = [f for f in os.listdir(path_json) if f.endswith(".json")]
file_path_list = [os.path.join(path_json, file_name) for file_name in file_list]

# ================================
# LOAD all data from JSON
# ================================

# Read and merge JSON files
df=pd.read_json(file_path_list[0])
for file_path in file_path_list[1:]:
    try:
        df_new = pd.read_json(file_path)
        # Stack the two dataframes
        df=pd.concat([df,df_new], ignore_index=True)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

df.reset_index(drop=True)

# ================================
# Processing steps
# ================================
# Adding the names of the colors

dict_colors = {
    'c1121f': 'red',
    'a1c181': 'green',
    '118ab2': 'blue',
    'ffd60a': 'yellow'
}

# Map color codes to names
if 'stimuli_shown_color' in df.columns:
    df['shown_color'] = df['stimuli_shown_color'].astype(str).map(dict_colors)
    df.rename(columns={'stimuli_shown_color': 'hex_code_shown_color'}, inplace=True)
else:
    print("Warning: 'stimuli_shown_color' column not found in the JSON files.")


# Add a condition column that specifies if the color and word are matching
df['condition'] = np.where(df['stimuli_shown_word'] == df['shown_color'], 'matching', 'not-matching')

# Add a column for performance: comparing word shown and answer.
df['performance']=np.where(df['stimuli_shown_word']==df['response_color'],'success','fail')


# ================================
# SAVE PROCESSED data
# ================================

# Ensure output directory exists
output_dir = os.path.dirname(output_file)
os.makedirs(output_dir, exist_ok=True)

# Convert DataFrame back to list of dictionaries
df.to_json(output_file)

print(f"✅ Aggregated JSON file saved at: {output_file}")
