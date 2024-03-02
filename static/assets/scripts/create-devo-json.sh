#!/bin/bash

# Make creating these jsons easier lol. 
create_json_file() {
    local input_file="$1"
    local output_file="$2"

    # Check if input file exists
    if [ ! -f "$input_file" ]; then
        echo "Input file '$input_file' does not exist"
        exit 1
    fi

    # Prompt user for translation of the text. 
    read -p "Enter the translation for the book (NOTE: IT DOES NOT SUPPORT MULTIPLE BOOKS IN THE SAME MONTH YET): " replacement_word

    # Process input file and generate JSON
    awk -v replacement="$replacement_word" '{
        # Remove first integer and its trailing whitespace
        sub(/^[0-9]+ /, "");
        # Replace each with the inputted text.
        for (i=1; i<=NF; i++) {       
            if ($i !~ /^[0-9]+$/) {
                $i = replacement
                break
            }
        }
        print "\"" $0 "\","
    }' "$input_file" | sed '$s/,$//' | awk 'BEGIN {print "["} {print} END {print "]"}' > "$output_file"

    echo "'$output_file' created successfully"
}

# setting the input/output file.
input_file="static/assets/scripts/devotional.txt"
output_file="static/assets/scripts/devotional-for-the-month.json"

create_json_file "$input_file" "$output_file"
